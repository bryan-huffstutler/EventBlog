import { getFilteredEvents } from "../../helpers/api-util";
import { useRouter } from 'next/router'
import EventList from "../../components/events/event-list";
import ResultsTitle from '../../components/events/results-title'
import { Fragment, useEffect, useState } from "react";
import ErrorAlert from '../../components/ui/error-alert'
import Button from "../../components/ui/button";
import useSWR from 'swr'

function FilteredEvents(props) {
    const [loadedEvents, setLoadedEvents] = useState()
    const router = useRouter()

    const filteredData = router.query.slug

    const { data, error } = useSWR('https://next-practice-9112c-default-rtdb.firebaseio.com/events.json', (url) => fetch(url).then(res => res.json()))

    useEffect(() => {
        if (data) {
            const events = []

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(events)
        }
    }, [data])

    if (!loadedEvents) {
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
        numMonth > 12 ||
        error) {
        return <ErrorAlert><p>Invalid filter, please adjust your values.</p></ErrorAlert>
    }
    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    })

    // const filteredEvents = props.events

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

// export async function getServerSideProps(context) {
//     const { params } = context

//     const filteredData = params.slug
//     const filteredYear = filteredData[0]
//     const filteredMonth = filteredData[1]

//     const numYear = +filteredYear
//     const numMonth = +filteredMonth

//     if (isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12) {
//         return {
//             hasError: true
//             // redirect: {
//             //     destination: '/error'
//             // },
//             // notFound: true 
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEvents;