import fs from 'fs';
import path from 'path';
import https from 'https';
import pc from 'picocolors';
import prompts from 'prompts';

const REGISTRY_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/arcstratus/main/ui/registry/index.json';
const COMPONENTS_BASE_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/arcstratus/main/ui/src/lib/components';

interface ComponentInfo {
  files: string[];
  path: string;
}

interface Registry {
  [key: string]: ComponentInfo;
}

async function fetchRegistry(): Promise<Registry> {
  return new Promise((resolve, reject) => {
    https.get(REGISTRY_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function fetchFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

export async function add(components: string[]) {
  try {
    console.log(pc.cyan('Fetching component registry...'));
    const registry = await fetchRegistry();

    // If no components specified, show selection
    let selectedComponents = components;
    if (!components || components.length === 0) {
      const choices = Object.keys(registry).map(name => ({
        title: name,
        value: name
      }));

      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which components would you like to add?',
        choices,
        min: 1
      });

      if (!response.components || response.components.length === 0) {
        console.log(pc.red('No components selected.'));
        process.exit(0);
      }

      selectedComponents = response.components;
    }

    // Process each component
    for (const component of selectedComponents) {
      const info = registry[component];

      if (!info) {
        console.log(pc.red(`Component "${component}" not found in registry.`));
        continue;
      }

      console.log(pc.cyan(`Adding ${component}...`));

      // Create target directory
      const targetDir = path.join(process.cwd(), 'src/lib/components/ui', component);
      fs.mkdirSync(targetDir, { recursive: true });

      // Download and save each file
      for (const file of info.files) {
        const fileUrl = `${COMPONENTS_BASE_URL}/${component}/${file}`;
        console.log(pc.gray(`  Downloading ${file}...`));

        try {
          const content = await fetchFile(fileUrl);
          const targetPath = path.join(targetDir, file);
          fs.writeFileSync(targetPath, content, 'utf-8');
          console.log(pc.green(`  ✓ ${file}`));
        } catch (error) {
          console.log(pc.red(`  ✗ Failed to download ${file}`));
          throw error;
        }
      }

      console.log(pc.green(`✓ ${component} added successfully!`));
    }

    console.log(pc.green('\n✓ All components added successfully!'));
  } catch (error) {
    console.error(pc.red('Error:'), error);
    process.exit(1);
  }
}
