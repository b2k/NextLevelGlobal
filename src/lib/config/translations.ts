export type TranslationExpression = {
	pattern: RegExp;
	replacement: string;
};
export type TranslationDictionary = {
	[key: string]: {
		exact: Record<string, string>;
		partial: TranslationExpression[];
	};
};

export const translations: TranslationDictionary = {
	es: {
		exact: {
			'Download the weekly discussion questions PDF.':
				'Descargue el PDF de las preguntas de discusión semanales.',
			'Scripture Summaries & Questions': 'Resumenes y preguntas de las Escrituras',
			'Gospel of John': 'Evangelio de Juan',
			'Memory Verses': 'Versículos para memorizar',
			'Quick Links': 'Enlaces rápidos',
			'Custom Start Date': 'Fecha de inicio personalizada',
			'Contact Us': 'Contáctenos',
			'Additional Resources': 'Recursos adicionales',
			'Next Level Vision': 'Visión de Next Level',
			Commitment: 'Compromiso',
			'Download Calendar': 'Descargar calendario',
			Subscribe: 'Suscribirse',
            'Purchase': 'Comprar',
            'Questions PDF': 'Preguntas PDF'
		},
		partial: [
			// Old Testament
			{ pattern: /\bGenesis\b/gi, replacement: 'Génesis' },
			{ pattern: /\bExodus\b/gi, replacement: 'Éxodo' },
			{ pattern: /\bLeviticus\b/gi, replacement: 'Levítico' },
			{ pattern: /\bNumbers\b/gi, replacement: 'Números' },
			{ pattern: /\bDeuteronomy\b/gi, replacement: 'Deuteronomio' },
			{ pattern: /\bJoshua\b/gi, replacement: 'Josué' },
			{ pattern: /\bJudges\b/gi, replacement: 'Jueces' },
			{ pattern: /\bRuth\b/gi, replacement: 'Rut' },
			{ pattern: /\b1\s*Samuel\b/gi, replacement: '1 Samuel' },
			{ pattern: /\b2\s*Samuel\b/gi, replacement: '2 Samuel' },
			{ pattern: /\b1\s*Kings\b/gi, replacement: '1 Reyes' },
			{ pattern: /\b2\s*Kings\b/gi, replacement: '2 Reyes' },
			{ pattern: /\b1\s*Chronicles\b/gi, replacement: '1 Crónicas' },
			{ pattern: /\b2\s*Chronicles\b/gi, replacement: '2 Crónicas' },
			{ pattern: /\bEzra\b/gi, replacement: 'Esdras' },
			{ pattern: /\bNehemiah\b/gi, replacement: 'Nehemías' },
			{ pattern: /\bEsther\b/gi, replacement: 'Ester' },
			{ pattern: /\bJob\b/gi, replacement: 'Job' },
			{ pattern: /\bPsalms?\b/gi, replacement: 'Salmos' },
			{ pattern: /\bProverbs\b/gi, replacement: 'Proverbios' },
			{ pattern: /\bEcclesiastes\b/gi, replacement: 'Eclesiastés' },
			{ pattern: /\bSong of Solomon\b/gi, replacement: 'Cantar de los Cantares' },
			{ pattern: /\bIsaiah\b/gi, replacement: 'Isaías' },
			{ pattern: /\bJeremiah\b/gi, replacement: 'Jeremías' },
			{ pattern: /\bLamentations\b/gi, replacement: 'Lamentaciones' },
			{ pattern: /\bEzekiel\b/gi, replacement: 'Ezequiel' },
			{ pattern: /\bDaniel\b/gi, replacement: 'Daniel' },
			{ pattern: /\bHosea\b/gi, replacement: 'Oseas' },
			{ pattern: /\bJoel\b/gi, replacement: 'Joel' },
			{ pattern: /\bAmos\b/gi, replacement: 'Amós' },
			{ pattern: /\bObadiah\b/gi, replacement: 'Abdías' },
			{ pattern: /\bJonah\b/gi, replacement: 'Jonás' },
			{ pattern: /\bMicah\b/gi, replacement: 'Miqueas' },
			{ pattern: /\bNahum\b/gi, replacement: 'Nahúm' },
			{ pattern: /\bHabakkuk\b/gi, replacement: 'Habacuc' },
			{ pattern: /\bZephaniah\b/gi, replacement: 'Sofonías' },
			{ pattern: /\bHaggai\b/gi, replacement: 'Hageo' },
			{ pattern: /\bZechariah\b/gi, replacement: 'Zacarías' },
			{ pattern: /\bMalachi\b/gi, replacement: 'Malaquías' },

			// New Testament
			{ pattern: /\bMatthew\b/gi, replacement: 'Mateo' },
			{ pattern: /\bMark\b/gi, replacement: 'Marcos' },
			{ pattern: /\bLuke\b/gi, replacement: 'Lucas' },
			{ pattern: /\bJohn\b/gi, replacement: 'Juan' },
			{ pattern: /\bActs\b/gi, replacement: 'Hechos' },
			{ pattern: /\bRomans\b/gi, replacement: 'Romanos' },
			{ pattern: /\b1\s*Corinthians\b/gi, replacement: '1 Corintios' },
			{ pattern: /\b2\s*Corinthians\b/gi, replacement: '2 Corintios' },
			{ pattern: /\bGalatians\b/gi, replacement: 'Gálatas' },
			{ pattern: /\bEphesians\b/gi, replacement: 'Efesios' },
			{ pattern: /\bPhilippians\b/gi, replacement: 'Filipenses' },
			{ pattern: /\bColossians\b/gi, replacement: 'Colosenses' },
			{ pattern: /\b1\s*Thessalonians\b/gi, replacement: '1 Tesalonicenses' },
			{ pattern: /\b2\s*Thessalonians\b/gi, replacement: '2 Tesalonicenses' },
			{ pattern: /\b1\s*Timothy\b/gi, replacement: '1 Timoteo' },
			{ pattern: /\b2\s*Timothy\b/gi, replacement: '2 Timoteo' },
			{ pattern: /\bTitus\b/gi, replacement: 'Tito' },
			{ pattern: /\bPhilemon\b/gi, replacement: 'Filemón' },
			{ pattern: /\bHebrews\b/gi, replacement: 'Hebreos' },
			{ pattern: /\bJames\b/gi, replacement: 'Santiago' },
			{ pattern: /\b1\s*Peter\b/gi, replacement: '1 Pedro' },
			{ pattern: /\b2\s*Peter\b/gi, replacement: '2 Pedro' },
			{ pattern: /\b1\s*John\b/gi, replacement: '1 Juan' },
			{ pattern: /\b2\s*John\b/gi, replacement: '2 Juan' },
			{ pattern: /\b3\s*John\b/gi, replacement: '3 Juan' },
			{ pattern: /\bJude\b/gi, replacement: 'Judas' },
			{ pattern: /\bRevelation\b/gi, replacement: 'Apocalipsis' },

			// Calendar shorthand
			{ pattern: /\bWeek\s+(\d+)\b/gi, replacement: 'Semana $1' },
			{ pattern: /\bQ-(\d+)\b/gi, replacement: 'P-$1' },
			{ pattern: /\bLCV\b/gi, replacement: 'VCM' },

			// Months
			{ pattern: /\bJanuary\b/gi, replacement: 'Enero' },
			{ pattern: /\bFebruary\b/gi, replacement: 'Febrero' },
			{ pattern: /\bMarch\b/gi, replacement: 'Marzo' },
			{ pattern: /\bApril\b/gi, replacement: 'Abril' },
			{ pattern: /\bMay\b/gi, replacement: 'Mayo' },
			{ pattern: /\bJune\b/gi, replacement: 'Junio' },
			{ pattern: /\bJuly\b/gi, replacement: 'Julio' },
			{ pattern: /\bAugust\b/gi, replacement: 'Agosto' },
			{ pattern: /\bSeptember\b/gi, replacement: 'Septiembre' },
			{ pattern: /\bOctober\b/gi, replacement: 'Octubre' },
			{ pattern: /\bNovember\b/gi, replacement: 'Noviembre' },
			{ pattern: /\bDecember\b/gi, replacement: 'Diciembre' },

			// Abbreviated months
			{ pattern: /\bJan\b/gi, replacement: 'Ene' },
			{ pattern: /\bFeb\b/gi, replacement: 'Feb' },
			{ pattern: /\bMar\b/gi, replacement: 'Mar' },
			{ pattern: /\bApr\b/gi, replacement: 'Abr' },
			{ pattern: /\bMay\b/gi, replacement: 'May' },
			{ pattern: /\bJun\b/gi, replacement: 'Jun' },
			{ pattern: /\bJul\b/gi, replacement: 'Jul' },
			{ pattern: /\bAug\b/gi, replacement: 'Ago' },
			{ pattern: /\bSep\b/gi, replacement: 'Sep' },
			{ pattern: /\bOct\b/gi, replacement: 'Oct' },
			{ pattern: /\bNov\b/gi, replacement: 'Nov' },
			{ pattern: /\bDec\b/gi, replacement: 'Dic' },

			// Weekdays
			{ pattern: /\bSunday\b/gi, replacement: 'Domingo' },
			{ pattern: /\bMonday\b/gi, replacement: 'Lunes' },
			{ pattern: /\bTuesday\b/gi, replacement: 'Martes' },
			{ pattern: /\bWednesday\b/gi, replacement: 'Miércoles' },
			{ pattern: /\bThursday\b/gi, replacement: 'Jueves' },
			{ pattern: /\bFriday\b/gi, replacement: 'Viernes' },
			{ pattern: /\bSaturday\b/gi, replacement: 'Sábado' },

			// Abbreviated weekdays
			{ pattern: /\bSun\b/gi, replacement: 'Dom' },
			{ pattern: /\bMon\b/gi, replacement: 'Lun' },
			{ pattern: /\bTue\b/gi, replacement: 'Mar' },
			{ pattern: /\bWed\b/gi, replacement: 'Mié' },
			{ pattern: /\bThu\b/gi, replacement: 'Jue' },
			{ pattern: /\bFri\b/gi, replacement: 'Vie' },
			{ pattern: /\bSat\b/gi, replacement: 'Sáb' }
		]
	}
};

export function t(phrase: string, lang?: string) {
	const resolvedLang =
		lang ??
		(globalThis?.localStorage?.getItem('lang') ||
			(
				globalThis as typeof globalThis & {
					localStorage?: { lang?: string };
				}
			).localStorage?.lang ||
			'en');

	return translations[resolvedLang]?.exact?.[phrase] ?? phrase;
}

export function r(phrase: string | undefined, lang?: string) {
	const resolvedLang =
		lang ??
		(globalThis?.localStorage?.getItem('lang') ||
			(
				globalThis as typeof globalThis & {
					localStorage?: { lang?: string };
				}
			).localStorage?.lang ||
			'en');

	phrase = t(phrase ?? '', resolvedLang);

	const partials = translations[resolvedLang]?.partial as TranslationExpression[] | undefined;
	if (partials) {
		for (const { pattern, replacement } of partials) {
			phrase = phrase.replace(pattern, replacement);
		}
	}
	return phrase;
}
