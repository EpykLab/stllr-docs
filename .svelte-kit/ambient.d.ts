
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const __MISE_ORIG_PATH: string;
	export const ATUIN_SESSION: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const USER: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const npm_config_user_agent: string;
	export const XDG_SEAT: string;
	export const __MISE_SESSION: string;
	export const GIT_EDITOR: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const VCS_PROMPT: string;
	export const RUSTUP_TOOLCHAIN: string;
	export const SHLVL: string;
	export const npm_config_noproxy: string;
	export const LESS: string;
	export const OPENAI_BASE_URL: string;
	export const S3_CONFIG_PROFILE: string;
	export const HOME: string;
	export const TERMINFO: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const OLDPWD: string;
	export const TERM_PROGRAM_VERSION: string;
	export const DCONF_PROFILE: string;
	export const npm_package_json: string;
	export const LSCOLORS: string;
	export const CARAPACE_SHELL_BUILTINS: string;
	export const ZSH: string;
	export const OPENAI_API_KEY: string;
	export const HOMEBREW_PREFIX: string;
	export const __MISE_DIFF: string;
	export const PAGER: string;
	export const CARAPACE_SHELL_FUNCTIONS: string;
	export const INTELLI_EXEC_PROMPT: string;
	export const npm_config_userconfig: string;
	export const npm_config_local_prefix: string;
	export const GOROOT: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const COLORTERM: string;
	export const COLOR: string;
	export const OPENCODE_EXPERIMENTAL_PLAN_MODE: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const IM_CONFIG_PHASE: string;
	export const WAYLAND_DISPLAY: string;
	export const INFOPATH: string;
	export const GTK_IM_MODULE: string;
	export const LOGNAME: string;
	export const __FNOX_SESSION: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const MISE_SHELL: string;
	export const OPENCODE_MODEL: string;
	export const npm_config_prefix: string;
	export const npm_config_npm_version: string;
	export const ATUIN_HISTORY_ID: string;
	export const TERM: string;
	export const XDG_SESSION_ID: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const SECUREFRAME_API_KEY: string;
	export const npm_config_cache: string;
	export const RUSTUP_HOME: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const GOBIN: string;
	export const HOMEBREW_CELLAR: string;
	export const NODE: string;
	export const npm_package_name: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const INTELLI_HOME: string;
	export const XDG_RUNTIME_DIR: string;
	export const GDK_BACKEND: string;
	export const DISPLAY: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const GHOSTTY_SHELL_FEATURES: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const XMODIFIERS: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LS_COLORS: string;
	export const CARAPACE_COMPLINE: string;
	export const TERM_PROGRAM: string;
	export const npm_lifecycle_script: string;
	export const SSH_AUTH_SOCK: string;
	export const SHELL: string;
	export const GHOSTTY_BIN_DIR: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const NODE_PATH: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const CARAPACE_ZSH_HASH_DIRS: string;
	export const CLAUDECODE: string;
	export const __MISE_ZSH_PRECMD_RUN: string;
	export const QT_IM_MODULE: string;
	export const XDG_VTNR: string;
	export const QT_ENABLE_HIGHDPI_SCALING: string;
	export const npm_config_globalconfig: string;
	export const npm_config_init_module: string;
	export const PWD: string;
	export const CLICOLOR: string;
	export const QT_QPA_PLATFORM: string;
	export const npm_execpath: string;
	export const FNOX_SHELL: string;
	export const CARGO_HOME: string;
	export const CLUTTER_IM_MODULE: string;
	export const XDG_DATA_DIRS: string;
	export const npm_config_global_prefix: string;
	export const FNOX_AGE_KEY: string;
	export const HOMEBREW_REPOSITORY: string;
	export const npm_command: string;
	export const CARAPACE_SHELL: string;
	export const S3_CONFIG_FILE: string;
	export const EDITOR: string;
	export const INIT_CWD: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		__MISE_ORIG_PATH: string;
		ATUIN_SESSION: string;
		GHOSTTY_RESOURCES_DIR: string;
		USER: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		npm_config_user_agent: string;
		XDG_SEAT: string;
		__MISE_SESSION: string;
		GIT_EDITOR: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		VCS_PROMPT: string;
		RUSTUP_TOOLCHAIN: string;
		SHLVL: string;
		npm_config_noproxy: string;
		LESS: string;
		OPENAI_BASE_URL: string;
		S3_CONFIG_PROFILE: string;
		HOME: string;
		TERMINFO: string;
		MOZ_ENABLE_WAYLAND: string;
		OLDPWD: string;
		TERM_PROGRAM_VERSION: string;
		DCONF_PROFILE: string;
		npm_package_json: string;
		LSCOLORS: string;
		CARAPACE_SHELL_BUILTINS: string;
		ZSH: string;
		OPENAI_API_KEY: string;
		HOMEBREW_PREFIX: string;
		__MISE_DIFF: string;
		PAGER: string;
		CARAPACE_SHELL_FUNCTIONS: string;
		INTELLI_EXEC_PROMPT: string;
		npm_config_userconfig: string;
		npm_config_local_prefix: string;
		GOROOT: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		COLORTERM: string;
		COLOR: string;
		OPENCODE_EXPERIMENTAL_PLAN_MODE: string;
		QT_QPA_PLATFORMTHEME: string;
		IM_CONFIG_PHASE: string;
		WAYLAND_DISPLAY: string;
		INFOPATH: string;
		GTK_IM_MODULE: string;
		LOGNAME: string;
		__FNOX_SESSION: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		MISE_SHELL: string;
		OPENCODE_MODEL: string;
		npm_config_prefix: string;
		npm_config_npm_version: string;
		ATUIN_HISTORY_ID: string;
		TERM: string;
		XDG_SESSION_ID: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		SECUREFRAME_API_KEY: string;
		npm_config_cache: string;
		RUSTUP_HOME: string;
		npm_config_node_gyp: string;
		PATH: string;
		GOBIN: string;
		HOMEBREW_CELLAR: string;
		NODE: string;
		npm_package_name: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		INTELLI_HOME: string;
		XDG_RUNTIME_DIR: string;
		GDK_BACKEND: string;
		DISPLAY: string;
		NoDefaultCurrentDirectoryInExePath: string;
		GHOSTTY_SHELL_FEATURES: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		XMODIFIERS: string;
		XDG_SESSION_DESKTOP: string;
		LS_COLORS: string;
		CARAPACE_COMPLINE: string;
		TERM_PROGRAM: string;
		npm_lifecycle_script: string;
		SSH_AUTH_SOCK: string;
		SHELL: string;
		GHOSTTY_BIN_DIR: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		NODE_PATH: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		CARAPACE_ZSH_HASH_DIRS: string;
		CLAUDECODE: string;
		__MISE_ZSH_PRECMD_RUN: string;
		QT_IM_MODULE: string;
		XDG_VTNR: string;
		QT_ENABLE_HIGHDPI_SCALING: string;
		npm_config_globalconfig: string;
		npm_config_init_module: string;
		PWD: string;
		CLICOLOR: string;
		QT_QPA_PLATFORM: string;
		npm_execpath: string;
		FNOX_SHELL: string;
		CARGO_HOME: string;
		CLUTTER_IM_MODULE: string;
		XDG_DATA_DIRS: string;
		npm_config_global_prefix: string;
		FNOX_AGE_KEY: string;
		HOMEBREW_REPOSITORY: string;
		npm_command: string;
		CARAPACE_SHELL: string;
		S3_CONFIG_FILE: string;
		EDITOR: string;
		INIT_CWD: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
