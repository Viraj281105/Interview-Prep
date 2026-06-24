import { programmingLanguagesData } from './programmingLanguages.js';
import { backendData } from './backend.js';
import { frontendData } from './frontend.js';
import { databasesData } from './databases.js';
import { aiMlData } from './ai-ml.js';
import { devopsData } from './devops.js';
import { dsaData } from './dsa.js';
import { coreCsData } from './core_cs.js';
import { projectsData } from './projects.js';
import { hrData } from './hr.js';

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
