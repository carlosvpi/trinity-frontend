import times from './times'
import { groupBy, indexBy } from 'ramda'

const publicationIds = d3.range(10)
const dayIds = d3.range(1, 8).map(day => `2017-06-0${day}`)
const hourIds = d3.range(24).map(hour => `${hour}:00`)
const platformIds = ['national', 'regional']
const channelIds = ['news', 'tv', 'sport']
const groups = { publicationIds, platformIds, channelIds }

const data = times(publicationIds, dayIds, hourIds, platform, channel)
    .map(([publication, day, hour, platform, channel]) => {
        const total = Math.ceil(Math.random() * 100)
        return {
            publication,
            day,
            hour,
            platform,
            channel,
            total,
            unique: Math.random(Math.random() * total)
        }
    })


const publications = {
    id: 'publication',
    members: publicationIds
}
const hours = {
    id: 'hour',
    members: hourIds
}
const days = {
    id: 'day',
    members: dayIds
}



const hourlyData = {
    dimensions: {
        hours
    },
    tuples: hourIds.map(hour => {
        const totalVisits = Math.round(Math.random() * 100)
        const uniqueVisits = Math.round(Math.random() * totalVisits)
        return {
            hour,
            totalVisits,
            uniqueVisits
        };
    })
};

const dailyData = {
    dimensions: {
        days
    },
    tuples: dayIds.map(day => {
        const totalVisits = Math.round(Math.random() * 100)
        const uniqueVisits = Math.round(Math.random() * totalVisits)
        return {
            day,
            totalVisits,
            uniqueVisits
        };
    })
};

const dailyPubliData = {
    dimensions: {
        days,
        publications
    },
    tuples: dayIds.times(publicationIds).map(([day, publication]) => {
        const totalVisits = Math.round(Math.random() * 100)
        const uniqueVisits = Math.round(Math.random() * totalVisits)
        return {
            day,
            publication,
            totalVisits,
            uniqueVisits
        };
    })
};

const publiData = {
    dimensions: {
        publications
    },
    tuples: publicationIds.map(publication => {
        const totalVisits = Math.round(Math.random() * 100)
        const uniqueVisits = Math.round(Math.random() * totalVisits)
        return {
            publication,
            totalVisits,
            uniqueVisits
        };
    })
};

export default ({ uniq, period, group }) = (function() {
    const response = {}
    let tuples = data
    if (period !== 'nothing') {
        const timeDimension = {
            id: time,
            members: period === 'day'
                ? dayId
                : period === 'hour'
                ? hourId
                : times(dayId, hourId).map(([day, hour]) => `${day} ${hour}`)
        }
        tuples = period === 'day'
            ? groupBy(prop('day'))
            : period === 'hour'
            ? groupBy(prop('hour'))
            : groupBy(prop('day'))
        response.dimensions = response.dimensions || {}
        response.dimensions.timeDimension = timeDimension
    }
    if (group !== 'nothing') {
        const groupDimension = {
            id: group,
            members: groups[group]
        }
        response.dimensions = response.dimensions || {}
        response.dimensions.timeDimension = timeDimension
    }

    return response
})()

</script>