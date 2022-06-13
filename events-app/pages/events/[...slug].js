import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from 'next/router'
import EventList from "../../components/events/event-list";
import ResultsTitle from '../../components/events/results-title'
import { Fragment } from "react";
import ErrorAlert from '../../components/ui/error-alert'
import Button from "../../components/ui/button";

function FilteredEvents() {
    const router = useRouter()

    const filteredData = router.query.slug

    if (!filteredData) {
        return <p className="center">Loading...</p>
    }

    const filteredYear = filteredData[0]
    const filteredMonth = filteredData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12) {
        return <ErrorAlert><p>Invalid filter, please adjust your values.</p></ErrorAlert>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert><p>No Events Found for the chosen filter.</p></ErrorAlert>
                <Button link='/events'>Show All Events</Button>
            </Fragment>)
    };

    const date = new Date(numYear, numMonth - 1);

    return (
        <div>
            <ResultsTitle date={date} />
            <EventList
                items={filteredEvents}
            />

        </div>
    );
};

export default FilteredEvents;