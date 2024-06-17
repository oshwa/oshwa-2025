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

  const today = new Date().toLocaleDateString();
  const pastEvents = [];
  const upcomingEvents = [];

  data.allContentfulEvent.edges.forEach(event => {
    (new Date(event.node.dateEnd).toLocaleDateString() >= today) ?
      upcomingEvents.push(event) :
      pastEvents.push(event)
  });

  const sortDates = (eventData) => {
    eventData.sort((a, b) => {
      return new Date(b.node.dateEnd) - new Date(a.node.dateEnd);
    });
  };

  sortDates(pastEvents);
  sortDates(upcomingEvents);

  return (
    <>
      <div className="p-10 pt-0 pb-5">
        <h2 className="generic-heading-2 py-8">Upcoming</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-4">
          {upcomingEvents.map(event => {
            return (
              <Link
                key={event.node.fields.slug}
                className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border section-card"
                to={`/events/${event.node.fields.slug}`}
              >
                <div className="event-container">
                  <p className="event-title">{event.node.title}</p>
                </div>

                {event.node.type === 'Open Hardware Summit' && (
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

                {event.node.type === 'Open Hardware Month' && (
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

        <h2 className="generic-heading-2 generic-heading-2--2nd-heading py-8">Past</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-4">
          {pastEvents.map(event => {
            return (
              <Link
                key={event.node.fields.slug}
                className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border section-card"
                to={`/events/${event.node.fields.slug}`}
              >
                <div className="event-container">
                  <p className="event-title">{event.node.title}</p>
                </div>

                {event.node.type === 'Open Hardware Summit' && (
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

                {event.node.type === 'Open Hardware Month' && (
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
