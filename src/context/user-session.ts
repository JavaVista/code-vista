import { createContextId } from '@builder.io/qwik';
import type { User } from '~/types/user.type';

export const UserSessionContext = createContextId<User>('user-session');