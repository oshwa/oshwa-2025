import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

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
                key={event.node.id}
                className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
                to={`events/${event.node.id}`}
              >
                <div className="event-container">
                  <p className="event-title">{event.node.title}</p>
                  <p>{event.node.dateEnd}</p>
                </div>

              </Link>
            );
          })}
        </div>

        <h2 className="generic-heading-2 generic-heading-2--2nd-heading py-8">Past</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-4">
          {pastEvents.map(event => {
            return (
              <Link
                key={event.node.id}
                className="lg:col-span-1 md:col-span-2 lg:mr-5 md:mr-5 notched notched--border"
                to={`events/${event.node.id}`}
              >
                <div className="event-container">
                  <p className="event-title">{event.node.title}</p>
                  <p>{event.node.dateEnd}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div >
    </>
  );
}
