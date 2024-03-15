#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function processTemplate(templatePath, outputPath, variables) {
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  let outputContent = templateContent;

  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    outputContent = outputContent.replace(regex, variables[key]);
  });

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(outputPath, outputContent);
}

function processFilesRecursively(basePath, projectPath, projectName) {
  fs.readdirSync(basePath, { withFileTypes: true }).forEach(entry => {
    const absoluteEntryPath = path.join(basePath, entry.name);
    if (entry.isDirectory()) {
      // Recursively process files in the directory
      processFilesRecursively(absoluteEntryPath, projectPath, projectName);
    } else {
      // Process the file
      const outputPath = path.join(projectPath, path.relative(__dirname, absoluteEntryPath).replace(/^templates[\\/]/, '').replace(/^_/, '').replace('.tmpl', ''));
      processTemplate(absoluteEntryPath, outputPath, { projectName });
    }
  });
}


program
  .name("create-remix-with-chakra-app")
  .description("CLI to scaffold a Remix with Chakra UI app")
  .argument('<project-directory>', 'Name of the project directory')
  .action((projectDirectory) => {
    const projectPath = path.resolve(process.cwd(), projectDirectory);
    console.log(`Creating a new Remix with Chakra UI app in ${projectPath}`);

    // Create directories based on the templates structure
    // For simplicity, this example assumes a flat structure
    fs.mkdirSync(path.join(projectPath, 'app'), { recursive: true });

    // Process each template file and directory recursively
    const templatesDir = path.join(__dirname, 'templates');
    processFilesRecursively(templatesDir, projectPath, projectDirectory);

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { cwd: projectPath, stdio: 'inherit' });

    console.log('Success! Your Remix with Chakra UI app is ready.');
  });

program.parse();