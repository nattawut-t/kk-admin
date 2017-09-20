import { parseLeadIn } from './lead';

export const parseLeadsIn = entries => entries
    ? entries.map(entry => parseLeadIn(entry))
    : {};
