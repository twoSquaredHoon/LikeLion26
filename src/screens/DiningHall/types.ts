// ─── Shared Types ─────────────────────────────────────────────────────────────
// Used across DiningHallsScreen and all child components.

export type StatusType = 'open' | 'soon' | 'closed';
export type SortOption = 'Relevance' | 'Open Now' | 'Closest';
export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MenuItem {
    name: string;
    favorited?: boolean;
    }

    export interface MenuCategory {
    category: string;
    items: MenuItem[];
    }

    export interface MealMenu {
    count: number;
    categories: MenuCategory[];
    }

    export interface DiningHall {
    id: string;
    name: string;
    emoji: string;
    emojiBg: string;
    status: StatusType;
    hours: string;
    aiPickLabel: string;
    aiPickName: string;
    closedNote?: string;
    mapsUrl: string;
    menus: Record<MealType, MealMenu>;
}