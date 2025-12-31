---
title: Install WinGet on Windows 11 LTSC
description:
aliases:
tags:
  - note
  - winget
draft: false
created: 2025-12-31T16:30
updated: 2025-12-31T17:16
---
Here is a revised version of your guide with improved formatting for both Obsidian and online publishing, along with a recommendation on headline structure.

### A Guide to Installing WinGet on Windows 11 LTSC

This guide provides step-by-step instructions for installing the Windows Package Manager (WinGet) on Windows 11 LTSC.

*** 

### Requirements

Before you begin, ensure you have the following: 

*   **Operating System:** Windows 11 LTSC (24H2 or newer is recommended)
*   **Permissions:** Administrator privileges
*   **Connectivity:** An active internet connection

*** 

### Manual Installation from the Microsoft `winget-cli` Repository

This method involves directly downloading and installing the necessary files from the official WinGet repository on GitHub.

#### 1. Download Required Files

Navigate to the [winget-cli GitHub releases page](https://github.com/microsoft/winget-cli/releases) and download the following files:

*   `DesktopAppInstaller_Dependencies.zip`
*   A file ending in `_License1.xml`
*   `Microsoft.DesktopAppInstaller_*.msixbundle`

#### 2. Extract and Organize Dependencies

1. Extract the contents of the `DesktopAppInstaller_Dependencies.zip` file.
2. Create a single folder and copy all the files from both the `x86` and `x64` folders into it.

#### 3. Install Dependencies

Open PowerShell with administrator privileges and run the following commands to install the necessary dependencies:

```powershell 
# Installs the Visual C++ Libraries 
Add-AppxPackage Microsoft.VCLibs.140.00_14.0.*_x86.appx 
Add-AppxPackage Microsoft.VCLibs.140.00_14.0.*_x64.appx 
Add-AppxPackage Microsoft.VCLibs.140.00.UWPDesktop_14.0.*_x86.appx 
Add-AppxPackage Microsoft.VCLibs.140.00.UWPDesktop_14.0.*_x64.appx 

# Installs the Windows App Runtime 
Add-AppxPackage Microsoft.WindowsAppRuntime.1.8_*_x86.appx 
Add-AppxPackage Microsoft.WindowsAppRuntime.1.8_*_x64.appx 
``` 

#### 4. Install the Main WinGet Package

Finally, install the main WinGet package by executing the following command in the same PowerShell window:

```powershell 
Add-AppxProvisionedPackage -Online -PackagePath Microsoft.DesktopAppInstaller.Msixbundle -LicensePath *_License1.xml 
``` 

#### 5. Verify the Installation

To confirm that WinGet has been installed correctly, open a **new** Command Prompt or PowerShell window and run the following command:

```powershell
winget --version
```

If the installation was successful, the command will return the installed version number of WinGet (e.g., `v1.8.1121`).
