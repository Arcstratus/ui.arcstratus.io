import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import pc from 'picocolors';
import prompts from 'prompts';

const UTILS_TEMPLATE = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

interface InitOptions {
  yes?: boolean;
  cwd?: string;
}

async function detectPackageManager(): Promise<'npm' | 'pnpm' | 'yarn' | 'bun'> {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

function getInstallCommand(packageManager: string): string {
  const packages = 'clsx tailwind-merge daisyui@latest';
  switch (packageManager) {
    case 'pnpm':
      return `pnpm add ${packages}`;
    case 'yarn':
      return `yarn add ${packages}`;
    case 'bun':
      return `bun add ${packages}`;
    default:
      return `npm install ${packages}`;
  }
}

function findCssFile(cwd: string): string | null {
  // Check for app.css first (older version)
  const appCssPath = path.join(cwd, 'src/app.css');
  if (fs.existsSync(appCssPath)) {
    return appCssPath;
  }

  // Check for layout.css (newer version)
  const layoutCssPath = path.join(cwd, 'src/layout.css');
  if (fs.existsSync(layoutCssPath)) {
    return layoutCssPath;
  }

  return null;
}

function addDaisyUIPlugin(cssPath: string): void {
  const pluginLine = '@plugin "daisyui";';
  const content = fs.readFileSync(cssPath, 'utf-8');

  // Check if plugin already exists
  if (content.includes(pluginLine)) {
    console.log(pc.gray('DaisyUI plugin already configured in CSS'));
    return;
  }

  // Append plugin line
  const newContent = content + '\n' + pluginLine + '\n';
  fs.writeFileSync(cssPath, newContent, 'utf-8');
  console.log(pc.green(`✓ Added DaisyUI plugin to ${path.basename(cssPath)}`));
}

export async function init(options: InitOptions = {}) {
  try {
    console.log(pc.cyan('Initializing Arcstratus UI...'));

    const cwd = options.cwd || process.cwd();

    // Detect package manager
    const packageManager = await detectPackageManager();
    console.log(pc.gray(`Detected package manager: ${packageManager}`));

    // Ask for confirmation unless --yes flag is provided
    if (!options.yes) {
      const response = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: `This will install ${pc.cyan('clsx')}, ${pc.cyan('tailwind-merge')}, and ${pc.cyan('daisyui')}. Continue?`,
        initial: true
      });

      if (!response.proceed) {
        console.log(pc.yellow('Installation cancelled.'));
        process.exit(0);
      }
    }

    // Install dependencies
    console.log(pc.cyan('\nInstalling dependencies...'));
    const installCmd = getInstallCommand(packageManager);
    console.log(pc.gray(`Running: ${installCmd}`));

    try {
      execSync(installCmd, { stdio: 'inherit', cwd });
      console.log(pc.green('✓ Dependencies installed'));
    } catch (error) {
      console.error(pc.red('Failed to install dependencies'));
      throw error;
    }

    // Configure DaisyUI in CSS file
    console.log(pc.cyan('\nConfiguring DaisyUI...'));
    const cssPath = findCssFile(cwd);

    if (cssPath) {
      addDaisyUIPlugin(cssPath);
    } else {
      console.log(pc.yellow('⚠ Could not find app.css or layout.css'));
      console.log(pc.gray('  Please manually add the following line to your CSS file:'));
      console.log(pc.cyan('  @plugin "daisyui";'));
    }

    // Create lib directory if it doesn't exist
    const libDir = path.join(cwd, 'src/lib');
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
      console.log(pc.gray(`Created directory: ${libDir}`));
    }

    // Create utils.ts file
    const utilsPath = path.join(libDir, 'utils.ts');

    if (fs.existsSync(utilsPath)) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${pc.yellow('utils.ts')} already exists. Overwrite?`,
        initial: false
      });

      if (!response.overwrite) {
        console.log(pc.yellow('Skipped creating utils.ts'));
        console.log(pc.green('\n✓ Initialization complete!'));
        return;
      }
    }

    fs.writeFileSync(utilsPath, UTILS_TEMPLATE, 'utf-8');
    console.log(pc.green('✓ Created utils.ts with cn() function'));

    console.log(pc.green('\n✓ Initialization complete!'));
    console.log(pc.gray('\nYou can now add components using:'));
    console.log(pc.cyan('  npx @arcstratus/ui add [component]'));

  } catch (error) {
    console.error(pc.red('Error during initialization:'), error);
    process.exit(1);
  }
}
