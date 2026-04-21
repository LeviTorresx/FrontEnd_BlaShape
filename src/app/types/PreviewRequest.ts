import { PreviewGroupDTO } from "./PreviewGroup";

export interface PreviewRequestDTO {
    plan: string;
    groups: PreviewGroupDTO[];
}