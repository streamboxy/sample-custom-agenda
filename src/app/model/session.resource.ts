export class SessionResource {
    id!: string;
    title!:  string;
    description!: string;
    imageSASUrl!: string;
    bookedByCurrentUser!: boolean;
    isMainSession!: boolean;
    startDateTimeUtc!: string;
    endDateTimeUtc!: string;

    customProperties?: {
        stageTrack?: string;
    };
}