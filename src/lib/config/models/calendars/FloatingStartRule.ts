export interface FloatingStartRule {
	month: number; // 1-12
	weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
	occurrence: number; // 1 = first, 2 = second, 3 = third, etc.
}
