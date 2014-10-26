select (extract(epoch from (recorded_at - '2014-10-26 13:00'))/3600)::integer as interval, sum(value) as minutes_on
from measurements
where code = 'on'
and recorded_at >= '2014-10-26 13:00'
group by interval
order by interval