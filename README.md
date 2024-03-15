# Create Remix with Chakra UI App

This CLI tool, `@weirdscience/create-remix-with-chakra-app`, is designed to scaffold a Remix app integrated with Chakra UI. It streamlines the setup process for a modern React-based project, making it easier to start building beautiful, accessible applications with Remix and Chakra UI.

## Installation

You can install the CLI globally on your machine using npm:

```bash
npm install -g @weirdscience/create-remix-with-chakra-app
```

## Usage

After installation, you can create a new Remix with Chakra UI app by running:

```bash
create-remix-with-chakra-app <project-directory>
```

Replace `<project-directory>` with the name of your project directory where you want to scaffold the new app.

### What It Does

The CLI performs the following actions:

1. Creates a new project directory with the specified name.
2. Sets up a basic project structure for a Remix app with Chakra UI integration.
3. Copies template files and directories from the CLI's `templates` directory into the new project, replacing placeholders with your project's specific information.
4. Installs dependencies necessary for the Remix app to run.
5. If the `--pro` flag is used, it sets up the project with Chakra UI Pro theme.

## Features

- **Easy Setup**: Quickly scaffold a new Remix app with Chakra UI integration.
- **Customizable Templates**: The CLI uses templates for project files, which can be customized to suit your needs.
- **Recursive File Processing**: Processes files and directories recursively, ensuring that your project structure is set up correctly.
- **Pro Theme Option**: Option to use Chakra UI Pro theme for advanced styling.

## Dependencies

This CLI tool depends on the following npm packages:

- `commander`: For parsing command-line arguments and options.

## Contributing

Contributions to improve `@weirdscience/create-remix-with-chakra-app` are welcome. Please feel free to submit issues and pull requests on the project's GitHub repository.

## License

This project is licensed under the ISC license.
