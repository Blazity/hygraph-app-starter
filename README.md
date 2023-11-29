# Hygraph Plugin Next.js Starter App - Documentation

## Table of Contents

1. [**TL;DR Documentation**](#tldr-documentation)

   - [Introduction](#introduction)
   - [Directory Structure](#directory-structure)
   - [Features](#features)
   - [Components](#components)
   - [Providers](#providers)
   - [Localization](#localization)
   - [API Routing](#api-routing)
   - [Customization](#customization)

2. [**Detailed Documentation**](#detailed-documentation)
   - [Setup](#setup)
     - `SetupPage` Component
     - Connection with Hygraph
   - [Asset Field](#asset-field)
     - `AssetField` Component
     - `AssetCardList` Component
   - [Asset Dialog](#asset-dialog)
     - `AssetDialog` Component
     - `DialogTable` Component
   - [Assets Preview Dialog](#assets-preview-dialog)
     - `AssetsPreviewDialog` Component
     - `SingleAssetPreview` Component
     - `MultipleAssetsPreview` Component
   - [Content Table View](#content-table-view)
     - `ContentTableCell` Component
   - [API Folder Structure and Functionality](#api-folder-structure-and-functionality)
     - API Constants
     - Server Route
     - Usage of API Key
     - Access to API Key
   - [Providers Overview and Details](#providers-overview-and-details)
     - `BaukastenProvider`
     - `HygraphProvider`
   - [Tailwind Setup and Hygraph Design System Integration](#tailwind-setup-and-hygraph-design-system-integration)

# TL;DR Documentation

## Introduction

Welcome to the Hygraph Starter App for Next.js. This template is designed to help developers quickly set up a Next.js project integrated with Hygraph Plugins. The app includes essential tooling and setup to work with assets and i18n support.

## Directory Structure

The following is an overview of the key directories and files included in the starter app:

- `src/app/`: Contains the main components and pages for the app.

- `src/providers/`: Houses providers for various context wrappers like HygraphProvider, BaukastenProvider, I18nProvider, and ReactQueryProvider.

- `src/types/`: This directory contains TypeScript definition files and general types used throughout the app. For component-specific type definitions, refer to the individual component folders.

- `src/hooks/`: Includes custom React hooks, particularly those for API fetching and app configuration.

- `src/i18n/`: Localization files for internationalization are located here.

## Features

- **Asset Management**: This app serves as an example of a Digital Asset Manager plugin, demonstrating integration and management of digital assets directly within its framework.
- **Hygraph Integration**: Ready-to-use components and hooks for easier integration with Hygraph CMS.
- **API Handling**: App structure for API requests, including CATS API example usage.
- **i18n Support**: Localization support using i18next for multilingual applications.

## Components

Here are some of the main components provided in the app:

- `Setup`: Provides UI for setting up and saving app configuration related to API keys.
- `AssetField`, `AssetDialog`, `AssetsPreviewDialog`: Components relating to asset selection and preview.
- `Hooks`: Custom hooks for managing assets and application configurations.

## Providers

The starter uses several context providers to manage state and functionality across the app:

- `HygraphProvider`: Wraps the app with Hygraph contexts for app SDK usage.
- `BaukastenProvider`: Theme provider for consistent styling.
- `I18nProvider`: Sets up i18n for the app with loaded resources.
- `ReactQueryProvider`: Configures React Query for data fetching management.

## Localization

Localization data is loaded from JSON files within the `src/i18n/` directory starting with `en/common.json`. To add support for additional languages, create new language-specific JSON files and include them in the i18n initialization within `I18nProvider.tsx`.

## API Routing

API routing is demonstrated with an example cats API integrated into the app. The `useAssetsQuery` hook is used to fetch data from an API route defined in `src/app/api/cats/route.ts`.

## Customization

You can customize this starter kit by editing the TypeScript types, React components, and i18n JSON files to fit your specific use case and requirements.

# Detailed Documentation

## Setup

The setup process is focused on configuring the application to work seamlessly with your asset management instance. This involves providing API keys and other necessary credentials for the app to connect to external services.

### `SetupPage` Component (`/src/app/setup/page.tsx`)

The `SetupPage` component is responsible for collecting API key input from the user to establish a connection with the asset manager. It includes form fields for the user to enter their API Key and a save button to store the configuration persistently.

The `useUpdateAppConfig` hook handles updates to the app's configuration, providing user feedback such as toasts in case of errors. The state of the API key is maintained in the component through a `useState` hook, and the entire form is built using components from the Baukasten UI toolkit.

### Connection with Hygraph (`/src/app/setup/hooks/useUpdateAppConfig`)

This directory contains the logic for updating the Hygraph app configuration. The `useUpdateAppConfig` hook uses a mutation from `@tanstack/react-query` to update installation settings, gracefully handling errors and updating the app's state.

## Asset Field

The asset field is a vital part of the starter app, allowing users to manage a list of assets. It supports operations like adding, updating, and removing assets, as well as drag and drop sorting.

### `AssetField` Component (`/src/app/asset-field/page.tsx`)

The `AssetField` handles rendering the UI for managing asset lists. It uses the custom `useFieldExtension` hook from the Hygraph SDK to handle field-related logic such as opening dialogs and updating values.

The component defines three main functions:

- `handleOpenPreviewDialog`: To open a dialog to preview assets.
- `handleOpenAssetManagerDialog`: To open the asset manager dialog for selecting assets.
- `handleOnRemoveItem`: To remove an asset from the list.

It supports both single and multiple asset configurations. The initial list of assets is processed through the `getInitialAssetsValue` function to give each item a unique ID.

### `AssetCardList` Component (`/src/app/asset-field/components/AssetCardList/AssetCardList.tsx`)

This component is a collection of `AssetCard` components that can be sorted via drag-and-drop, powered by `@dnd-kit/core` and `@dnd-kit/sortable`. It can be configured to be either draggable or non-draggable, depending on whether sorting is enabled.

## Asset Dialog

The asset dialog serves as the user interface for selecting assets. It shows a grid of available assets that the user can select to add to their asset list.

### `AssetDialog` Component (`/src/app/asset-dialog/page.tsx`)

Displayed when the user wishes to add or update assets, this dialog presents a paged view of available assets. The dialog interacts with the `useUiExtensionDialog` hook from the Hygraph SDK to manage dialog state and interactions. The dialog includes a table-like layout constructed using Baukasten components, where assets can be selected and passed back to the `AssetField`.

### `DialogTable` Component (`/src/app/asset-dialog/components/DialogTable.tsx`)

The `DialogTable` component is a grid display that allows the user to select assets. This component is passed `onCloseDialog` to handle closure with selected items and an `isSingleSelect` to determine if multiple selection is allowed.

## Assets Preview Dialog

The assets preview dialog is for visualizing the currently selected assets. It can switch between a single asset preview and a multiple assets view, depending on the context.

### `AssetsPreviewDialog` Component (`/src/app/assets-preview-dialog/page.tsx`)

The `AssetsPreviewDialog` provides functionality to preview selected assets. It uses the `useUiExtensionDialog` hook to retrieve the assets array and provides methods to handle previewing, closing, and deleting assets.

If the assets array contains only one asset, it triggers the `SingleAssetPreview`; otherwise, it shows the `MultipleAssetsPreview`.

### `SingleAssetPreview` Component (`/src/app/assets-preview-dialog/components/SingleAssetPreview/SingleAssetPreview.tsx`)

This component displays a comprehensive preview of a single asset, including options for navigating back to the multi-selection preview (`MultipleAssetsPreview`) or closing the dialog. Users interact with icons from the Hygraph icons library, with contextual positioning and actions.

### `MultipleAssetsPreview` Component (`/src/app/assets-preview-dialog/components/MultipleAssetsPreview/MultipleAssetsPreview.tsx`)

In scenarios where multiple assets are selected, `MultipleAssetsPreview` is used to show all assets. It uses a grid layout for displaying thumbnail previews and is interactive, allowing users to click on an asset to view it in detail or to pass selections back to the main field component.

## Content Table View

### `ContentTableCell` Component

In contrast to other components used in the editing view, `ContentTableCell` serves a specific role in presenting assets within a content table cell after they have been selected and saved in a given entry. Here's what it provides:

- **Miniature Previews**: Displays up to three asset thumbnails, visual representations of the selected assets.
- **Fallback Content**: Presents a placeholder or an error icon when an image is not available or fails to load.
- **Preview Dialog Trigger**: Clicking on the asset thumbnails opens the `AssetsPreviewDialog`, enabling users to view larger previews and additional details.

Each thumbnail in the `ContentTableCell` is an instance of the `ContentTableCellThumbnail` component. It manages the loading state and rendering of individual asset images or placeholders.

In summary, the Asset Field components offer a comprehensive interface for asset management within the Hygraph CMS. Users can smoothly add, organize, and preview assets while editing content entries, with all related components working in tandem to provide a seamless experience.

## API Folder Structure and Functionality

The API folder contains the server-side logic for handling external API requests. This starter app includes an example setup that interacts with an external cats API to demonstrate how server-side APIs can be integrated within a Next.js project.

### API Constants (`/src/app/api/consts.ts`)

This file defines constants used in the API setup, such as the base route for the API endpoints. In the starter app, it declares the `CATS_API_BASE_ROUTE` constant, representing the server-side route that will handle requests related to cat data.

### Server Route (`/src/app/api/cats/route.ts`)

The server route defined in the `route.ts` file within the `cats` directory is responsible for handling POST requests made to the cats API. When this route receives a POST request, it expects to receive the API Key within the request body that was saved during the setup phase. This API Key is then used to make authenticated requests to the external cats API.

The process of a POST request to this route is as follows:

1. The request body is parsed to obtain the configuration, specifically the API Key.
2. The server verifies the presence of the API Key. If it is missing, an error is thrown.
3. The server makes a fetch request to the external `CAT_API_URL` using the provided API Key as an authorization header.
4. Data is fetched from the external API, processed (e.g., sliced to return only the first 10 cats), and finally returned as a JSON response.

In case of an error, such as a failure to fetch data from the external API or any other issue, the route catches the exception and returns an appropriate error response.

The API setup in the Hygraph Starter App demonstrates how server-side routes can securely handle API keys and other credentials, which are first provided by users during the setup phase. These credentials are then used for authenticated communication with external APIs, and the API setup is designed to handle success and error states gracefully.

### Usage of API Key

The API Key plays a crucial role in the server routes. It is the same API Key that users input on the Setup page. After adding the API Key on the Setup page, it is stored in the app's configuration. When the app later makes server-side requests (for instance, when fetching assets), it includes this API Key in the request headers to authenticate against the external API.

### Access to API Key

The `useAppConfig` custom hook fetches the API Key from the app's configuration context, made possible by the Hygraph SDK's `useApp` hook. This configuration is then passed on to the API routes that require it. When the `useAssetsQuery` hook makes a request to the `CATS_API_BASE_ROUTE`, it includes the configuration object, including the API Key in the request body.

## Providers Overview and Details

Providers in the Hygraph Starter App are essential for setting up the context and accessing various functionalities throughout the application. Let's delve into the specifics of each provider.

### BaukastenProvider

Located in `/src/providers/BaukastenProvider.tsx`, the BaukastenProvider serves as a context wrapper for the Baukasten UI library. Baukasten is a component library that adheres to the Hygraph design system, providing a coherent set of UI components styled according to Hygraph's visual guidelines. By utilizing this provider, developers can easily integrate and use these pre-styled components within the app, ensuring a consistent look and feel that is representative of the Hygraph style guide.

#### Key Features:

- Utilizes Hygraph's design tokens and themes.
- Provides a consistent UI/UX aligned with the Hygraph brand.
- Enables rapid development with a library of pre-built and customizable components.

### HygraphProvider

The HygraphProvider, found in `/src/providers/HygraphProvider.tsx`, wraps the entire application with the context provided by the Hygraph App SDK for React. This provider makes it possible for the application to interact with the Hygraph CMS APIs and to be installed within the Hygraph ecosystem as a plugin. The SDK provides hooks and utilities to facilitate communication and data exchange between the app and the Hygraph CMS.

#### Key Features:

- Offers access to the Hygraph App SDK's React hooks and components.
- Enables app installation and integration within the Hygraph ecosystem.
- Facilitates management of app configuration and context data.

### Tailwind Setup and Hygraph Design System Integration

The starter app is configured with Tailwind CSS, a utility-first CSS framework that allows for rapid UI development. The Tailwind setup has been customized to include all colors from the Hygraph design system with their proper naming conventions. This ensures that the color palette used throughout the application aligns with the styling consistent with Hygraph's brand.

Located in the `/src/app/globals.css` file:

- `@tailwind base;` sets up base styles that apply throughout the app.
- `@tailwind components;` incorporates styles defined for reusable components.
- `@tailwind utilities;` enables utility classes for styling individual aspects on-demand.

#### Key Features:

- Customized Tailwind configuration incorporating Hygraph's design system colors.
- Allows for easy use of Hygraph's color palette within any component.
- Supports consistency and brand adherence with regards to styling.

By combining the UI components from Baukasten with the customized Tailwind setup, developers can ensure that their applications not only fit into the Hygraph ecosystem seamlessly but also adopt a design that resonates with Hygraph's aesthetic values. The use of these providers and configurations is pivotal in maintaining design standardization and fostering an enhanced developer experience.
