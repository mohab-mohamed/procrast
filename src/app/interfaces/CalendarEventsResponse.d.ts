export interface CalendarEventsResponse {
    calendarsData: CalendarsData;
  }
  export interface CalendarsData {
    kind: string;
    etag: string;
    summary: string;
    updated: string;
    timeZone: string;
    accessRole: string;
    defaultReminders?: (DefaultRemindersEntity)[] | null;
    nextSyncToken: string;
    items?: (ItemsEntity)[] | null;
  }
  export interface DefaultRemindersEntity {
    method: string;
    minutes: number;
  }
  export interface ItemsEntity {
    kind: string;
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created: string;
    updated: string;
    summary: string;
    creator: CreatorOrOrganizer;
    organizer: CreatorOrOrganizer;
    start: StartOrEnd;
    end: StartOrEnd;
    iCalUID: string;
    sequence: number;
    reminders: Reminders;
    eventType: string;
  }
  export interface CreatorOrOrganizer {
    email: string;
    self: boolean;
  }
  export interface StartOrEnd {
    dateTime: string;
  }
  export interface Reminders {
    useDefault: boolean;
  }
  