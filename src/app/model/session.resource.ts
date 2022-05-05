import { BookabilityEnum } from "./bookability.enum";
import { VisibilityEnum } from "./visibility.enum";

export class SessionResource {
    id!: string;
    title!:  string;
    description!: string;
    imageSASUrl!: string;
    bookedByCurrentUser!: boolean;
    isMainSession!: boolean;
    startDateTimeUtc!: string;
    endDateTimeUtc!: string;
    bookability!: BookabilityEnum;
    visibility!: VisibilityEnum;
    customPermissions!: boolean;
    customProperties?: {
        stageTrack?: string;
    };
}