#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function processConditionalBlocks(template, isPro) {
  const regex = /{{#if isPro}}([\s\S]*?){{else}}([\s\S]*?){{\/if}}/g;

  return template.replace(regex, (match, proContent, regularContent) => {
    return isPro ? proContent : regularContent;
  });
}

function processTemplate(templatePath, outputPath, variables) {

  let templateContent = fs.readFileSync(templatePath, 'utf8');

  if (variables.isPro !== undefined) {
    templateContent = processConditionalBlocks(templateContent, variables.isPro);
  }

  let outputContent = templateContent;

  Object.keys(variables).forEach((key) => {
    if (key !== 'isPro') {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      outputContent = outputContent.replace(regex, variables[key]);
    }
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, outputContent);
}

function processFilesRecursively(basePath, projectPath, projectName, options) {
  fs.readdirSync(basePath, { withFileTypes: true }).forEach(entry => {
    const absoluteEntryPath = path.join(basePath, entry.name);
    if (entry.isDirectory()) {
      processFilesRecursively(absoluteEntryPath, projectPath, projectName, options);
    } else {
      const outputPath = path.join(projectPath, path.relative(__dirname, absoluteEntryPath).replace(/^templates[\\/]/, '').replace(/^_/, '').replace('.tmpl', ''));
      processTemplate(absoluteEntryPath, outputPath, { projectName, ...options });
    }
  });
}


program
  .name("create-remix-with-chakra-app")
  .description("CLI to scaffold a Remix with Chakra UI app")
  .argument('<project-directory>', 'Name of the project directory')
  .option('--pro', 'Use Chakra UI Pro theme')
  .action((projectDirectory, options) => {
    const projectPath = path.resolve(process.cwd(), projectDirectory);
    console.log(`Creating a new Remix with Chakra UI app in ${projectPath}`);

    fs.mkdirSync(path.join(projectPath, 'app'), { recursive: true });

    const templatesDir = path.join(__dirname, 'templates');
    processFilesRecursively(templatesDir, projectPath, projectDirectory, { isPro: options.pro ?? false });

    console.log('Installing dependencies...');
    execSync('npm install', { cwd: projectPath, stdio: 'inherit' });

    console.log('Success! Your Remix with Chakra UI app is ready.');
  });

program.parse();