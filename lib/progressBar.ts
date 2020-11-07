import colors from 'colors';
import ProgressBar from 'progress';

export default (fileSize: number, fileName: string) => new ProgressBar(`${colors.cyan(`${fileName} [:bar] :percent | ~${(fileSize / 1024 / 1024).toFixed(2)}MB | :etas`)}`, {
  total: fileSize,
  complete: '■',
  incomplete: '.',
  width: 25
});
