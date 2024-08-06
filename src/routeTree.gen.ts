/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as LoginRouteImport } from './routes/login/route';
import { Route as ContactRouteImport } from './routes/contact/route';
import { Route as IndexRouteImport } from './routes/index/route';
import { Route as AboutPartnersRouteImport } from './routes/about_/partners/route';
import { Route as ResearchProjectsIndexImport } from './routes/research_/projects/index';
import { Route as EventsRoundTablesIndexImport } from './routes/events_/round-tables/index';
import { Route as EventsPhdThesesIndexImport } from './routes/events_/phd-theses/index';
import { Route as EventsOtherEventsIndexImport } from './routes/events_/other-events/index';
import { Route as AboutMembersIndexImport } from './routes/about_/members/index';
import { Route as AboutHistoryIndexImport } from './routes/about_/history/index';
import { Route as AboutDescriptionAndObjectivesIndexImport } from './routes/about_/description-and-objectives/index';
import { Route as ResearchPublicationsTranslationsIndexImport } from './routes/research_/publications_/translations/index';
import { Route as ResearchPublicationsMembersPublicationsIndexImport } from './routes/research_/publications_/members-publications/index';
import { Route as ResearchPublicationsLingvisticConferencesIndexImport } from './routes/research_/publications_/lingvistic-conferences/index';
import { Route as EventsConferencesLingvisticFrancophonesIndexImport } from './routes/events_/conferences_/lingvistic-francophones/index';
import { Route as ResearchPublicationsDialogueFrancophonesVolumesIndexImport } from './routes/research_/publications_/dialogue-francophones_/volumes/index';
import { Route as ResearchPublicationsDialogueFrancophonesIndexingIndexImport } from './routes/research_/publications_/dialogue-francophones_/indexing/index';
import { Route as ResearchPublicationsDialogueFrancophonesEditorialPolicyIndexImport } from './routes/research_/publications_/dialogue-francophones_/editorial-policy/index';
import { Route as ResearchPublicationsDialogueFrancophonesCommitteesIndexImport } from './routes/research_/publications_/dialogue-francophones_/committees/index';
import { Route as ResearchPublicationsDialogueFrancophonesAboutIndexImport } from './routes/research_/publications_/dialogue-francophones_/about/index';
import { Route as ResearchPublicationsAgapesFrancophonesVolumesIndexImport } from './routes/research_/publications_/agapes-francophones_/volumes/index';
import { Route as ResearchPublicationsAgapesFrancophonesIndexingIndexImport } from './routes/research_/publications_/agapes-francophones_/indexing/index';
import { Route as ResearchPublicationsAgapesFrancophonesEditorialPolicyIndexImport } from './routes/research_/publications_/agapes-francophones_/editorial-policy/index';
import { Route as ResearchPublicationsAgapesFrancophonesCommitteesIndexImport } from './routes/research_/publications_/agapes-francophones_/committees/index';
import { Route as ResearchPublicationsAgapesFrancophonesAboutIndexImport } from './routes/research_/publications_/agapes-francophones_/about/index';
import { Route as EventsConferencesFrancophonesStudiesPreviousEditionsIndexImport } from './routes/events_/conferences_/francophones-studies_/previous-editions_/index';
import { Route as EventsConferencesCieftPreviousEditionsIndexImport } from './routes/events_/conferences_/cieft_/previous-editions_/index';
import { Route as ResearchPublicationsDialogueFrancophonesVolumesVolumeIdImport } from './routes/research_/publications_/dialogue-francophones_/volumes/$volumeId';
import { Route as ResearchPublicationsDialogueFrancophonesCallsCallIdImport } from './routes/research_/publications_/dialogue-francophones_/calls_/$callId';
import { Route as EventsConferencesFrancophonesStudiesPreviousEditionsYearImport } from './routes/events_/conferences_/francophones-studies_/previous-editions_/$year';
import { Route as EventsConferencesFrancophonesStudiesCurrentYearScientificCommitteeImport } from './routes/events_/conferences_/francophones-studies_/current-year_/scientific-committee';
import { Route as EventsConferencesFrancophonesStudiesCurrentYearRegistrationImport } from './routes/events_/conferences_/francophones-studies_/current-year_/registration';
import { Route as EventsConferencesFrancophonesStudiesCurrentYearOrganizersAndPartnersImport } from './routes/events_/conferences_/francophones-studies_/current-year_/organizers-and-partners';
import { Route as EventsConferencesFrancophonesStudiesCurrentYearInfoImport } from './routes/events_/conferences_/francophones-studies_/current-year_/info';
import { Route as EventsConferencesFrancophonesStudiesCurrentYearCallsImport } from './routes/events_/conferences_/francophones-studies_/current-year_/calls';
import { Route as EventsConferencesCieftPreviousEditionsYearImport } from './routes/events_/conferences_/cieft_/previous-editions_/$year';
import { Route as EventsConferencesCieftCurrentYearScientificCommitteeImport } from './routes/events_/conferences_/cieft_/current-year_/scientific-committee';
import { Route as EventsConferencesCieftCurrentYearRegistrationImport } from './routes/events_/conferences_/cieft_/current-year_/registration';
import { Route as EventsConferencesCieftCurrentYearOrganizersAndPartnersImport } from './routes/events_/conferences_/cieft_/current-year_/organizers-and-partners';
import { Route as EventsConferencesCieftCurrentYearInfoImport } from './routes/events_/conferences_/cieft_/current-year_/info';
import { Route as EventsConferencesCieftCurrentYearCallsImport } from './routes/events_/conferences_/cieft_/current-year_/calls';
import { Route as ResearchPublicationsDialogueFrancophonesCallsPastIndexImport } from './routes/research_/publications_/dialogue-francophones_/calls_/past/index';
import { Route as ResearchPublicationsDialogueFrancophonesCallsFutureIndexImport } from './routes/research_/publications_/dialogue-francophones_/calls_/future/index';
import { Route as ResearchPublicationsAgapesFrancophonesCallsPastIndexImport } from './routes/research_/publications_/agapes-francophones_/calls_/past/index';
import { Route as ResearchPublicationsAgapesFrancophonesCallsFutureIndexImport } from './routes/research_/publications_/agapes-francophones_/calls_/future/index';

// Create/Update Routes

const LoginRouteRoute = LoginRouteImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any);

const ContactRouteRoute = ContactRouteImport.update({
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any);

const IndexRouteRoute = IndexRouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const AboutPartnersRouteRoute = AboutPartnersRouteImport.update({
  path: '/about/partners',
  getParentRoute: () => rootRoute,
} as any);

const ResearchProjectsIndexRoute = ResearchProjectsIndexImport.update({
  path: '/research/projects/',
  getParentRoute: () => rootRoute,
} as any);

const EventsRoundTablesIndexRoute = EventsRoundTablesIndexImport.update({
  path: '/events/round-tables/',
  getParentRoute: () => rootRoute,
} as any);

const EventsPhdThesesIndexRoute = EventsPhdThesesIndexImport.update({
  path: '/events/phd-theses/',
  getParentRoute: () => rootRoute,
} as any);

const EventsOtherEventsIndexRoute = EventsOtherEventsIndexImport.update({
  path: '/events/other-events/',
  getParentRoute: () => rootRoute,
} as any);

const AboutMembersIndexRoute = AboutMembersIndexImport.update({
  path: '/about/members/',
  getParentRoute: () => rootRoute,
} as any);

const AboutHistoryIndexRoute = AboutHistoryIndexImport.update({
  path: '/about/history/',
  getParentRoute: () => rootRoute,
} as any);

const AboutDescriptionAndObjectivesIndexRoute =
  AboutDescriptionAndObjectivesIndexImport.update({
    path: '/about/description-and-objectives/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsTranslationsIndexRoute =
  ResearchPublicationsTranslationsIndexImport.update({
    path: '/research/publications/translations/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsMembersPublicationsIndexRoute =
  ResearchPublicationsMembersPublicationsIndexImport.update({
    path: '/research/publications/members-publications/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsLingvisticConferencesIndexRoute =
  ResearchPublicationsLingvisticConferencesIndexImport.update({
    path: '/research/publications/lingvistic-conferences/',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesLingvisticFrancophonesIndexRoute =
  EventsConferencesLingvisticFrancophonesIndexImport.update({
    path: '/events/conferences/lingvistic-francophones/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesVolumesIndexRoute =
  ResearchPublicationsDialogueFrancophonesVolumesIndexImport.update({
    path: '/research/publications/dialogue-francophones/volumes/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesIndexingIndexRoute =
  ResearchPublicationsDialogueFrancophonesIndexingIndexImport.update({
    path: '/research/publications/dialogue-francophones/indexing/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesEditorialPolicyIndexRoute =
  ResearchPublicationsDialogueFrancophonesEditorialPolicyIndexImport.update({
    path: '/research/publications/dialogue-francophones/editorial-policy/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesCommitteesIndexRoute =
  ResearchPublicationsDialogueFrancophonesCommitteesIndexImport.update({
    path: '/research/publications/dialogue-francophones/committees/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesAboutIndexRoute =
  ResearchPublicationsDialogueFrancophonesAboutIndexImport.update({
    path: '/research/publications/dialogue-francophones/about/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesVolumesIndexRoute =
  ResearchPublicationsAgapesFrancophonesVolumesIndexImport.update({
    path: '/research/publications/agapes-francophones/volumes/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesIndexingIndexRoute =
  ResearchPublicationsAgapesFrancophonesIndexingIndexImport.update({
    path: '/research/publications/agapes-francophones/indexing/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesEditorialPolicyIndexRoute =
  ResearchPublicationsAgapesFrancophonesEditorialPolicyIndexImport.update({
    path: '/research/publications/agapes-francophones/editorial-policy/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesCommitteesIndexRoute =
  ResearchPublicationsAgapesFrancophonesCommitteesIndexImport.update({
    path: '/research/publications/agapes-francophones/committees/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesAboutIndexRoute =
  ResearchPublicationsAgapesFrancophonesAboutIndexImport.update({
    path: '/research/publications/agapes-francophones/about/',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesFrancophonesStudiesPreviousEditionsIndexRoute =
  EventsConferencesFrancophonesStudiesPreviousEditionsIndexImport.update({
    path: '/events/conferences/francophones-studies/previous-editions/',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftPreviousEditionsIndexRoute =
  EventsConferencesCieftPreviousEditionsIndexImport.update({
    path: '/events/conferences/cieft/previous-editions/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesVolumesVolumeIdRoute =
  ResearchPublicationsDialogueFrancophonesVolumesVolumeIdImport.update({
    path: '/research/publications/dialogue-francophones/volumes/$volumeId',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesCallsCallIdRoute =
  ResearchPublicationsDialogueFrancophonesCallsCallIdImport.update({
    path: '/research/publications/dialogue-francophones/calls/$callId',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesFrancophonesStudiesPreviousEditionsYearRoute =
  EventsConferencesFrancophonesStudiesPreviousEditionsYearImport.update({
    path: '/events/conferences/francophones-studies/previous-editions/$year',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesFrancophonesStudiesCurrentYearScientificCommitteeRoute =
  EventsConferencesFrancophonesStudiesCurrentYearScientificCommitteeImport.update(
    {
      path: '/events/conferences/francophones-studies/current-year/scientific-committee',
      getParentRoute: () => rootRoute,
    } as any
  );

const EventsConferencesFrancophonesStudiesCurrentYearRegistrationRoute =
  EventsConferencesFrancophonesStudiesCurrentYearRegistrationImport.update({
    path: '/events/conferences/francophones-studies/current-year/registration',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesFrancophonesStudiesCurrentYearOrganizersAndPartnersRoute =
  EventsConferencesFrancophonesStudiesCurrentYearOrganizersAndPartnersImport.update(
    {
      path: '/events/conferences/francophones-studies/current-year/organizers-and-partners',
      getParentRoute: () => rootRoute,
    } as any
  );

const EventsConferencesFrancophonesStudiesCurrentYearInfoRoute =
  EventsConferencesFrancophonesStudiesCurrentYearInfoImport.update({
    path: '/events/conferences/francophones-studies/current-year/info',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesFrancophonesStudiesCurrentYearCallsRoute =
  EventsConferencesFrancophonesStudiesCurrentYearCallsImport.update({
    path: '/events/conferences/francophones-studies/current-year/calls',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftPreviousEditionsYearRoute =
  EventsConferencesCieftPreviousEditionsYearImport.update({
    path: '/events/conferences/cieft/previous-editions/$year',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftCurrentYearScientificCommitteeRoute =
  EventsConferencesCieftCurrentYearScientificCommitteeImport.update({
    path: '/events/conferences/cieft/current-year/scientific-committee',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftCurrentYearRegistrationRoute =
  EventsConferencesCieftCurrentYearRegistrationImport.update({
    path: '/events/conferences/cieft/current-year/registration',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftCurrentYearOrganizersAndPartnersRoute =
  EventsConferencesCieftCurrentYearOrganizersAndPartnersImport.update({
    path: '/events/conferences/cieft/current-year/organizers-and-partners',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftCurrentYearInfoRoute =
  EventsConferencesCieftCurrentYearInfoImport.update({
    path: '/events/conferences/cieft/current-year/info',
    getParentRoute: () => rootRoute,
  } as any);

const EventsConferencesCieftCurrentYearCallsRoute =
  EventsConferencesCieftCurrentYearCallsImport.update({
    path: '/events/conferences/cieft/current-year/calls',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesCallsPastIndexRoute =
  ResearchPublicationsDialogueFrancophonesCallsPastIndexImport.update({
    path: '/research/publications/dialogue-francophones/calls/past/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsDialogueFrancophonesCallsFutureIndexRoute =
  ResearchPublicationsDialogueFrancophonesCallsFutureIndexImport.update({
    path: '/research/publications/dialogue-francophones/calls/future/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesCallsPastIndexRoute =
  ResearchPublicationsAgapesFrancophonesCallsPastIndexImport.update({
    path: '/research/publications/agapes-francophones/calls/past/',
    getParentRoute: () => rootRoute,
  } as any);

const ResearchPublicationsAgapesFrancophonesCallsFutureIndexRoute =
  ResearchPublicationsAgapesFrancophonesCallsFutureIndexImport.update({
    path: '/research/publications/agapes-francophones/calls/future/',
    getParentRoute: () => rootRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/contact': {
      preLoaderRoute: typeof ContactRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/login': {
      preLoaderRoute: typeof LoginRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/about/partners': {
      preLoaderRoute: typeof AboutPartnersRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/about/description-and-objectives/': {
      preLoaderRoute: typeof AboutDescriptionAndObjectivesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/about/history/': {
      preLoaderRoute: typeof AboutHistoryIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/about/members/': {
      preLoaderRoute: typeof AboutMembersIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/events/other-events/': {
      preLoaderRoute: typeof EventsOtherEventsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/events/phd-theses/': {
      preLoaderRoute: typeof EventsPhdThesesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/events/round-tables/': {
      preLoaderRoute: typeof EventsRoundTablesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/projects/': {
      preLoaderRoute: typeof ResearchProjectsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/lingvistic-francophones/': {
      preLoaderRoute: typeof EventsConferencesLingvisticFrancophonesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/lingvistic-conferences/': {
      preLoaderRoute: typeof ResearchPublicationsLingvisticConferencesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/members-publications/': {
      preLoaderRoute: typeof ResearchPublicationsMembersPublicationsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/translations/': {
      preLoaderRoute: typeof ResearchPublicationsTranslationsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/current-year/calls': {
      preLoaderRoute: typeof EventsConferencesCieftCurrentYearCallsImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/current-year/info': {
      preLoaderRoute: typeof EventsConferencesCieftCurrentYearInfoImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/current-year/organizers-and-partners': {
      preLoaderRoute: typeof EventsConferencesCieftCurrentYearOrganizersAndPartnersImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/current-year/registration': {
      preLoaderRoute: typeof EventsConferencesCieftCurrentYearRegistrationImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/current-year/scientific-committee': {
      preLoaderRoute: typeof EventsConferencesCieftCurrentYearScientificCommitteeImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/previous-editions/$year': {
      preLoaderRoute: typeof EventsConferencesCieftPreviousEditionsYearImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/current-year/calls': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesCurrentYearCallsImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/current-year/info': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesCurrentYearInfoImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/current-year/organizers-and-partners': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesCurrentYearOrganizersAndPartnersImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/current-year/registration': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesCurrentYearRegistrationImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/current-year/scientific-committee': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesCurrentYearScientificCommitteeImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/previous-editions/$year': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesPreviousEditionsYearImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/calls/$callId': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesCallsCallIdImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/volumes/$volumeId': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesVolumesVolumeIdImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/cieft/previous-editions/': {
      preLoaderRoute: typeof EventsConferencesCieftPreviousEditionsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/events/conferences/francophones-studies/previous-editions/': {
      preLoaderRoute: typeof EventsConferencesFrancophonesStudiesPreviousEditionsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/about/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesAboutIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/committees/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesCommitteesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/editorial-policy/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesEditorialPolicyIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/indexing/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesIndexingIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/volumes/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesVolumesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/about/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesAboutIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/committees/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesCommitteesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/editorial-policy/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesEditorialPolicyIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/indexing/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesIndexingIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/volumes/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesVolumesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/calls/future/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesCallsFutureIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/agapes-francophones/calls/past/': {
      preLoaderRoute: typeof ResearchPublicationsAgapesFrancophonesCallsPastIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/calls/future/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesCallsFutureIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/research/publications/dialogue-francophones/calls/past/': {
      preLoaderRoute: typeof ResearchPublicationsDialogueFrancophonesCallsPastIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRouteRoute,
  ContactRouteRoute,
  LoginRouteRoute,
  AboutPartnersRouteRoute,
  AboutDescriptionAndObjectivesIndexRoute,
  AboutHistoryIndexRoute,
  AboutMembersIndexRoute,
  EventsOtherEventsIndexRoute,
  EventsPhdThesesIndexRoute,
  EventsRoundTablesIndexRoute,
  ResearchProjectsIndexRoute,
  EventsConferencesLingvisticFrancophonesIndexRoute,
  ResearchPublicationsLingvisticConferencesIndexRoute,
  ResearchPublicationsMembersPublicationsIndexRoute,
  ResearchPublicationsTranslationsIndexRoute,
  EventsConferencesCieftCurrentYearCallsRoute,
  EventsConferencesCieftCurrentYearInfoRoute,
  EventsConferencesCieftCurrentYearOrganizersAndPartnersRoute,
  EventsConferencesCieftCurrentYearRegistrationRoute,
  EventsConferencesCieftCurrentYearScientificCommitteeRoute,
  EventsConferencesCieftPreviousEditionsYearRoute,
  EventsConferencesFrancophonesStudiesCurrentYearCallsRoute,
  EventsConferencesFrancophonesStudiesCurrentYearInfoRoute,
  EventsConferencesFrancophonesStudiesCurrentYearOrganizersAndPartnersRoute,
  EventsConferencesFrancophonesStudiesCurrentYearRegistrationRoute,
  EventsConferencesFrancophonesStudiesCurrentYearScientificCommitteeRoute,
  EventsConferencesFrancophonesStudiesPreviousEditionsYearRoute,
  ResearchPublicationsDialogueFrancophonesCallsCallIdRoute,
  ResearchPublicationsDialogueFrancophonesVolumesVolumeIdRoute,
  EventsConferencesCieftPreviousEditionsIndexRoute,
  EventsConferencesFrancophonesStudiesPreviousEditionsIndexRoute,
  ResearchPublicationsAgapesFrancophonesAboutIndexRoute,
  ResearchPublicationsAgapesFrancophonesCommitteesIndexRoute,
  ResearchPublicationsAgapesFrancophonesEditorialPolicyIndexRoute,
  ResearchPublicationsAgapesFrancophonesIndexingIndexRoute,
  ResearchPublicationsAgapesFrancophonesVolumesIndexRoute,
  ResearchPublicationsDialogueFrancophonesAboutIndexRoute,
  ResearchPublicationsDialogueFrancophonesCommitteesIndexRoute,
  ResearchPublicationsDialogueFrancophonesEditorialPolicyIndexRoute,
  ResearchPublicationsDialogueFrancophonesIndexingIndexRoute,
  ResearchPublicationsDialogueFrancophonesVolumesIndexRoute,
  ResearchPublicationsAgapesFrancophonesCallsFutureIndexRoute,
  ResearchPublicationsAgapesFrancophonesCallsPastIndexRoute,
  ResearchPublicationsDialogueFrancophonesCallsFutureIndexRoute,
  ResearchPublicationsDialogueFrancophonesCallsPastIndexRoute,
]);

/* prettier-ignore-end */
