---
title: install-winget-on-windows-11-ltsc
description: Install WinGet on Windows 11 LTSC
aliases:
tags:
  - note
  - winget
draft: false
created: 2025-12-31T16:30
updated: 2025-12-31T16:57
---
This guide describes several methods to install WinGet (Windows Package Manager) on Windows 11 LTSC.

## Requirements

- Windows 11 LTSC (24H2 or newer recommended)
- Administrator privileges
- Internet access

## Manual Installation Directly from the Microsoft winget‑cli Repository.

1. Download the following from the winget GitHub releases:
	- `DesktopAppInstaller_Dependencies.zip`
	- `*_License1.xml`
	- `Microsoft.DesktopAppInstaller_*.msixbundle`
	source: [Releases · microsoft/winget-cli](https://github.com/microsoft/winget-cli/releases)
	
2. Extract `DesktopAppInstaller_Dependencies.zip`
	- Copy all files from both `x86` and `x64` folders into one folder.
	  
3. Install dependencies:
```pwsh
Add-AppxPackage Microsoft.VCLibs.140.00_14.0.*_x86.appx
Add-AppxPackage Microsoft.VCLibs.140.00_14.0.*_x64.appx
Add-AppxPackage Microsoft.VCLibs.140.00.UWPDesktop_14.0.*_x86.appx
Add-AppxPackage Microsoft.VCLibs.140.00.UWPDesktop_14.0.*_x64.appx
Add-AppxPackage Microsoft.WindowsAppRuntime.1.8_*_x86.appx
Add-AppxPackage Microsoft.WindowsAppRuntime.1.8_*_x64.appx
```

4. Install main package
```pwsh
Add-AppxProvisionedPackage -Online -PackagePath Microsoft.DesktopAppInstaller.Msixbundle -LicensePath *_License1.xml
```