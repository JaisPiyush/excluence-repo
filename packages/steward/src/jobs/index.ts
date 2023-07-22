import { ClassConstructor, plainToInstance } from 'class-transformer';
import { BaseJob, JobImp } from './job.definition';
import { CreateEventJob } from './CreateEvent.job';

export * from './job.definition';

export const JobDictionary = new Map<string, ClassConstructor<BaseJob>>([
    [CreateEventJob.name, CreateEventJob]
]);

export const getJobInstance = (data: JobImp) => {
    const jobClass = JobDictionary.get(data.name);
    if (jobClass) {
        return plainToInstance(jobClass, data);
    }
    return {} as JobImp;
};
