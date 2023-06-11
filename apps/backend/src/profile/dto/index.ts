import { ProfileGuild } from '../schema/profile-guilds.schema';

export interface ProfileGuildWithMetadata extends ProfileGuild {
  icon: string | null;
  name: string;
}
