
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/docs" | "/api/docs/chat" | "/api/docs/nav" | "/api/docs/search-index" | "/docs" | "/docs/[...slug]";
		RouteParams(): {
			"/docs/[...slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/api": Record<string, never>;
			"/api/docs": Record<string, never>;
			"/api/docs/chat": Record<string, never>;
			"/api/docs/nav": Record<string, never>;
			"/api/docs/search-index": Record<string, never>;
			"/docs": { slug?: string };
			"/docs/[...slug]": { slug: string }
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/docs" | "/api/docs/" | "/api/docs/chat" | "/api/docs/chat/" | "/api/docs/nav" | "/api/docs/nav/" | "/api/docs/search-index" | "/api/docs/search-index/" | "/docs" | "/docs/" | `/docs/${string}` & {} | `/docs/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.gitkeep" | "/apple-touch-icon.png" | "/cover.jpg" | "/docs/trust portal/user-manual/user-login.png" | "/docs/trust portal/user-manual/user-mfa-setup.png" | "/docs/trust portal/user-manual/user-new-request-questionnaire.png" | "/docs/trust portal/user-manual/user-req-dropdown-for-details.png" | "/docs/trust portal/user-manual/user-request-detailed-report-bottom.png" | "/docs/trust portal/user-manual/user-request-detailed-report-top.png" | "/docs/trust portal/user-manual/user-requests-made.png" | "/docs/trust portal/user-manual/user-sign-up.png" | "/docs/trust-portal/trust-portal-user-manual/user-login.png" | "/docs/trust-portal/trust-portal-user-manual/user-mfa-setup.png" | "/docs/trust-portal/trust-portal-user-manual/user-new-request-questionnaire.png" | "/docs/trust-portal/trust-portal-user-manual/user-req-dropdown-for-details.png" | "/docs/trust-portal/trust-portal-user-manual/user-request-detailed-report-bottom.png" | "/docs/trust-portal/trust-portal-user-manual/user-request-detailed-report-top.png" | "/docs/trust-portal/trust-portal-user-manual/user-requests-made.png" | "/docs/trust-portal/trust-portal-user-manual/user-sign-up.png" | "/docs/trust-portal/user-manual/user-login.png" | "/docs/trust-portal/user-manual/user-mfa-setup.png" | "/docs/trust-portal/user-manual/user-new-request-questionnaire.png" | "/docs/trust-portal/user-manual/user-req-dropdown-for-details.png" | "/docs/trust-portal/user-manual/user-request-detailed-report-bottom.png" | "/docs/trust-portal/user-manual/user-request-detailed-report-top.png" | "/docs/trust-portal/user-manual/user-requests-made.png" | "/docs/trust-portal/user-manual/user-sign-up.png" | "/icon.svg" | "/logo.svg" | string & {};
	}
}