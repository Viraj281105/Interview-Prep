import { programmingLanguagesData } from './programmingLanguages';
import { backendData } from './backend';
import { frontendData } from './frontend';
import { databasesData } from './databases';
import { aiMlData } from './ai-ml';
import { devopsData } from './devops';
import { dsaData } from './dsa';
import { coreCsData } from './core_cs';
import { projectsData } from './projects';
import { hrData } from './hr';

export const allDataModules = [
  ...programmingLanguagesData,
  ...backendData,
  ...frontendData,
  ...databasesData,
  ...aiMlData,
  ...devopsData,
  ...dsaData,
  ...coreCsData,
  ...projectsData,
  ...hrData,
];
