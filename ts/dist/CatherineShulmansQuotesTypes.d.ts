export interface Api {
    api?: string;
    author?: string;
    disclaimer?: string;
    endpoints?: Record<string, any>;
    mirrors?: Record<string, any>;
    programs?: any[];
    statistics?: Record<string, any>;
}
export interface ApiListMatch {
    api?: string;
    author?: string;
    disclaimer?: string;
    endpoints?: Record<string, any>;
    mirrors?: Record<string, any>;
    programs?: any[];
    statistics?: Record<string, any>;
}
export interface Episode {
    episodes?: any[];
    id?: string;
    program?: string;
    title?: string;
    total?: number;
    url?: string;
}
export interface EpisodeLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface EpisodeListMatch {
    episodes?: any[];
    id?: string;
    program?: string;
    title?: string;
    total?: number;
    url?: string;
}
export interface GithubAnalytics {
}
export interface GithubAnalyticsLoadMatch {
    username: string;
}
export interface GithubCard {
}
export interface GithubCardLoadMatch {
    username: string;
    style?: string;
}
export interface GithubLanguage {
}
export interface GithubLanguageLoadMatch {
    username: string;
}
export interface Quote {
    id?: number;
    source?: string;
    text?: string;
}
export interface QuoteLoadMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface QuoteListMatch {
    id?: number;
    source?: string;
    text?: string;
}
