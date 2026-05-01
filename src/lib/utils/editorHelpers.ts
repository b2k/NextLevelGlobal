import fs from 'fs';
import path from 'path';

export function getTimestamp() {
	return new Date()
		.toISOString()            // 2026-04-30T11:42:15.123Z
		.replace(/[:.\-TZ]/g, '') // 20260430T114215123 → 20260430T114215
		.slice(0, 15);            // YYYYMMDDTHHMMSS
}

export function archiveFile(filePath: string) {
	if (!fs.existsSync(filePath)) return;

	const dir = path.dirname(filePath);
	const ext = path.extname(filePath);
	const base = path.basename(filePath, ext);

	const timestamp = getTimestamp();
	const archiveName = `${base}-${timestamp}${ext}`;
	const archivePath = path.join(dir, archiveName);

	fs.renameSync(filePath, archivePath);
}
