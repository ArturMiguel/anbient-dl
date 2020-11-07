import inquirer from 'inquirer';
import { Episode } from '../models/Episode';

export default async (episodes: Episode[]) => {
  const selectedEpisodes = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selected_episodes',
      message: 'Selecione os episódios que deseja baixar: ',
      choices: episodes.map(episode => {
        return {
          name: episode.name,
          value: episode,
          short: episode.name
        }
      }),
      pageSize: episodes.length
    }
  ]);
  return selectedEpisodes.selected_episodes;
}
