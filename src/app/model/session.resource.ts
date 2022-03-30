export class SessionResource {
    id!: string;
    title!:  string;
    description!: string;
    imageSASUrl!: string;
    bookedByCurrentUser!: boolean;
    
    startDateTimeUtc!: string;
    endDateTimeUtc!: string;

    customProperties?: {
        stageTrack?: string;
    };
}