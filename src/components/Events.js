import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

export const EventsTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
       allContentfulEvent {
        edges {
          node {
            id
            title
            dateStart
            dateEnd
            fields {
              slug
            }
            type
          }
        }
      }
    }
  `);

  const today = new Date();
  const pastEvents = [];
  const upcomingEvents = [];

  data.allContentfulEvent.edges.forEach(({ node }) => {
    const eventEndDate = new Date(node.dateEnd);
    eventEndDate >= today
      ? upcomingEvents.push({ ...node })
      : pastEvents.push({ ...node });
  });

  const sortDates = (eventData, ascending = true) => {
    eventData.sort((a, b) => {
      const dateA = new Date(a.dateEnd);
      const dateB = new Date(b.dateEnd);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  };

  sortDates(upcomingEvents);
  sortDates(pastEvents, false);

  return (
    <>
      <div className="px-8">
        {upcomingEvents.length > 0 && (
          <>
            <h2 className="generic-heading-2 py-8">Upcoming</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
              {upcomingEvents.map(event => {
                return (
                  <Link
                    key={event.fields.slug}
                    className="lg:col-span-1 md:col-span-2 notched notched--border notched--border--hover section-card"
                    to={`/events/${event.fields.slug}`}
                  >
                    <div className="event-container">
                      <p className="event-title">{event.title}</p>
                    </div>

                    {event.type === 'Open Hardware Summit' && (
                      <>
                        <StaticImage
                          className="section-card__image image-theme--light"
                          src="../images/icon-summit.svg"
                          alt="Temp Oshwa Logo"
                          placeholder='none'
                        />
                        <StaticImage
                          className="section-card__image image-theme--dark"
                          src="../images/icon-summit-white.svg"
                          alt="Temp Oshwa Logo"
                          placeholder='none'
                        />
                      </>
                    )}

                    {event.type === 'Open Hardware Month' && (
                      <>
                        <StaticImage
                          className="section-card__image image-theme--light"
                          src="../images/icon-ohmonth.svg"
                          alt="Temp Oshwa Logo"
                          placeholder='none'
                        />
                        <StaticImage
                          className="section-card__image image-theme--dark"
                          src="../images/icon-ohmonth-white.svg"
                          alt="Temp Oshwa Logo"
                          placeholder='none'
                        />
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <h2 className="generic-heading-2 generic-heading-2--2nd-heading py-8">Past</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
          {pastEvents.map(event => {
            return (
              <Link
                key={event.fields.slug}
                className="lg:col-span-1 md:col-span-4 sm:col-span-4 notched notched--border notched--border--hover section-card"
                to={`/events/${event.fields.slug}`}
              >
                <div className="event-container">
                  <p className="event-title">{event.title}</p>
                </div>

                {event.type === 'Open Hardware Summit' && (
                  <>
                    <StaticImage
                      className="section-card__image image-theme--light"
                      src="../images/icon-summit.svg"
                      alt="Temp Oshwa Logo"
                      placeholder='none'
                    />
                    <StaticImage
                      className="section-card__image image-theme--dark"
                      src="../images/icon-summit-white.svg"
                      alt="Temp Oshwa Logo"
                      placeholder='none'
                    />
                  </>
                )}

                {event.type === 'Open Hardware Month' && (
                  <>
                    <StaticImage
                      className="section-card__image image-theme--light"
                      src="../images/icon-ohmonth.svg"
                      alt="Temp Oshwa Logo"
                      placeholder='none'
                    />
                    <StaticImage
                      className="section-card__image image-theme--dark"
                      src="../images/icon-ohmonth-white.svg"
                      alt="Temp Oshwa Logo"
                      placeholder='none'
                    />
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div >
    </>
  );
}
