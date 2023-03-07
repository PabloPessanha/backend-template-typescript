import 'reflect-metadata';
import { container } from 'tsyringe';
import { Application } from '@/presentation/App';

const app = container.resolve(Application);
app.initialize();
