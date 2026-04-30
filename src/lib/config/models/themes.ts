export type ThemeName = 'light' | 'dark';

export interface ThemeDefinition {
	name: ThemeName;
	page: {
		background: string;
		text: string;
		heroBackground: string;
		heroText: string;
		heroMutedText: string;
		breadcrumbText: string;
		breadcrumbHoverText: string;
		secondaryButtonBorder: string;
		secondaryButtonBackground: string;
		secondaryButtonHoverBackground: string;
		primaryButtonBackground: string;
		primaryButtonHoverBackground: string;
		primaryButtonShadow: string;
	};
	section: {
		background: string;
		text: string;
		accent: string;
		cardBackground: string;
		cardBorder: string;
		buttonPrimaryBg: string;
		buttonPrimaryText: string;
	};
}

export const themes: Record<ThemeName, ThemeDefinition> = {
	light: {
		name: 'light',
		page: {
			background:
				'radial-gradient(circle at top, rgba(37, 99, 235, 0.08), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
			text: '#0f172a',
			heroBackground: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
			heroText: '#ffffff',
			heroMutedText: 'rgba(255, 255, 255, 0.78)',
			breadcrumbText: 'rgba(255, 255, 255, 0.72)',
			breadcrumbHoverText: '#ffffff',
			secondaryButtonBorder: 'rgba(255, 255, 255, 0.22)',
			secondaryButtonBackground: 'rgba(255, 255, 255, 0.04)',
			secondaryButtonHoverBackground: 'rgba(255, 255, 255, 0.1)',
			primaryButtonBackground: '#2563eb',
			primaryButtonHoverBackground: '#1d4ed8',
			primaryButtonShadow: '0 10px 25px rgba(37, 99, 235, 0.28)'
		},
		section: {
			background: '#ffffff',
			text: '#0f172a',
			accent: '#2563eb',
			cardBackground: 'rgba(255, 255, 255, 0.72)',
			cardBorder: 'rgba(148, 163, 184, 0.3)',
			buttonPrimaryBg: '#0f172a',
			buttonPrimaryText: '#fff'
		}
	},
	dark: {
		name: 'dark',
		page: {
			background:
				'radial-gradient(circle at top, rgba(59, 130, 246, 0.14), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)',
			text: '#e2e8f0',
			heroBackground: 'linear-gradient(180deg, #000000 0%, #111827 100%)',
			heroText: '#f8fafc',
			heroMutedText: 'rgba(248, 250, 252, 0.78)',
			breadcrumbText: 'rgba(248, 250, 252, 0.72)',
			breadcrumbHoverText: '#ffffff',
			secondaryButtonBorder: 'rgba(255, 255, 255, 0.18)',
			secondaryButtonBackground: 'rgba(255, 255, 255, 0.06)',
			secondaryButtonHoverBackground: 'rgba(255, 255, 255, 0.12)',
			primaryButtonBackground: '#3b82f6',
			primaryButtonHoverBackground: '#2563eb',
			primaryButtonShadow: '0 10px 25px rgba(59, 130, 246, 0.24)'
		},
		section: {
			background: '#111827',
			text: '#f8fafc',
			accent: '#60a5fa',
			cardBackground: 'rgba(15, 23, 42, 0.72)',
			cardBorder: 'rgba(255, 255, 255, 0.12)',
			buttonPrimaryBg: '#f8fafc',
			buttonPrimaryText: '#111827'
		}
	}
};

export function getTheme(theme?: ThemeName): ThemeDefinition {
	return themes[theme ?? 'light'];
}
