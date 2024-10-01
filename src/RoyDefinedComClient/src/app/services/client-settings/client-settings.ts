import { z } from 'zod';
import { darkModeTypeSchema } from '../dark-mode/darkModeType';

/**
 * A schema for the configurable client settings.
 */
export const clientSettingsSchema = z
    .object({
        darkModeType: darkModeTypeSchema.optional().nullable(),
    })
    .strict();
