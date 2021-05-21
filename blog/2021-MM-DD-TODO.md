---
slug: TODO
title: TODO
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh1
author_image_url: /img/avatars/ali.jpg
description: TODO
hide_table_of_contents: true
Date: "2021-MM-DDT00:00:00Z"
---

TODO

—

<iframe width="90%" height="350" src="https://www.youtube.com/watch?v=F8G9bhwNfNY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>

The following is lightly edited transcript of our meeting:

**Ali**: 
**David**:

hey everyone i have david julia here today
um who is uh head of engineering at
eagle.io
uh david thank you very much for taking
time to speak with me today would you
like to introduce yourself
uh yeah absolutely so david julia head
of engineering at eagle i o so we do
um environmental iot so we're an
environmental iot
data platform essentially uh you know
you connect up all sorts of
devices to us were used in water
monitoring natural resource monitoring
um various other things
like you know even they use us to
monitor
the cracks in mount rushmore for example
how mount rushmore is splitting and and
how that's going
and whether they need to remediate
anything so you know a broad variety of
use cases all these
data loggers centers uh connected to the
platform
um and analytics and uh
processing logic on that um so you know
fun
gig for me i just started that a couple
of months ago
before that i was
in software engineering consulting for a
long time about you know
eight nine years at pivotal labs and
then
vmware uh but yeah um
fun little project that we're working on
now and uh
had the chance to jump into some cost
attribution stuff as part of it
that's the conversation today very cool
yeah thanks for
um reaching out on twitter um
so maybe um which cloud providers are
using or could you share with that so
all this iot stuff
data directly to the cloud or is it
going through a bunch of gateways in
between
yeah so maybe i'll give the like 30
second version of how how it works
um we're a multi-tenant sas platform so
the whole value proposition of eagle i o
is like
um you know unlike aws iot core
or azure iot like those we think of
those as like primitive building blocks
which you know if you want to build your
own solution cool go nuts with them
um but we're you know much higher up the
stack than that
so you know essentially for these like
engineering firms
or uh big you know municipal water
companies state
water companies uh mining companies that
they don't really want to build a bunch
of you know
you know mess around with all this uh
code and iot
uh core and all of this different stuff
that's out there which is really cool
admittedly
but not core to their business so they
just hook up to us
and uh very quickly they're able to get
data in
analyze it alert on it like if you know
if you're monitoring a dam for example
you want to know if a dam wall is
failing you don't really care about
configuring microservices or anything
like that
so we're a multi-tenant sas
application lots and lots of different
users
but a lot of shared resources as well
so that's kind of the layout perfect
and maybe you can tell us then why in
this context
or what do you mean by cost attribution
and and why do the whole cloud costs
matter as part of that yeah sure and i i
just realized i didn't answer your
previous question initially we're mostly
aws right
and so why cost attribution
well um it's pretty fundamental
especially when you're building a data
intensive application like ours
um but also in other circumstances
you really just want to know one
can i guarantee that i'm going to make
good gross margin
and two
[Applause]
if i add more customers am i going to be
adding more profit or not is it going to
be impacting my gross margin positively
or negatively
and if that's a very big question mark
that's
something to be nervous about and that's
actually the situation we found
ourselves in
we um
we were negotiating with a particular
enterprise customer who
wanted to uh essentially
more than 10x their usage of the
platform
and so they said well and they said hey
you got to give us a discount for this
to be financially
uh feasible for us to do this uh and
we want to do this deal you guys want to
do this deal but we need to make it in
the realm of
dollars and that we can actually do we
said well we
we should be able to do this but our
current pricing model
doesn't scale for them uh
or or maybe it's just the numbers but if
we give them too deep of a discount are
we gonna lose money on the thing
like we don't know like what are our
costs what's their usage
what rights like what what's even
driving our costs
uh so that's when we really sat down and
said okay we need to figure this out
and you know the guys had suspected
before i got there that the current
pricing model which is
you pay for the essentially pay per data
source so data sources like
a device that's connected to the
platform spitting out
time series data to us so it could be
like a little
water monitor that's measuring flow rate
and temperature and battery voltage and
we had some levels of tiering in our
pricing model
in terms of like basic accounts pro
accounts
and uh there was some tiering based on
pricing
so like uh
the sourcing meaning you know the number
of parameters you could actually send us
uh
so we do some touring based on you know
small medium large data sources
and those have different price points
depending on the tier of account
that you are with us okay um so if
you're looking at a pro account
you pay a little less okay i see but it
wasn't like detailed down to like
you know this much data is being
produced so then we're kind of like have
to mark it up by this much or do
anything like that
no so i think you know
i don't know if that would necessarily
make sense we did talk about that as a
pricing model
that like really true usage-based
pricing
okay um but no
our customers aren't really like
software people
they're not really some of them are but
only
to as it means a means to an end yeah so
yeah they don't like thinking in
gigabytes of data
or complicated uh you know like yeah
they just want to know like
i hook it up and how many things am i
sending it to you and and how frequently
am i sending it
and they don't want to deal with the
calculation of oh well if
i'm sending an integer it's this if i'm
sending a string it's that and
they don't want to care about any of
that so we had a very simple
pricing model there but with that
simplicity actually
drives a much more complex model around
well
how much is it going to cost us sure
services as a customer okay
and um the kind of conversations i've
seen in this space uh are normally with
companies like
uh i don't know segments or much like
large companies who are either
getting close to ipo or like
looking at like cost of goods sold and
things like that
why does this stuff matter for like
earlier stage
companies then yeah well i think there
are two things
one is if you're just trying to prove
product market fit and you're like super
early
it might not really matter especially if
you got
plenty of cash in the bank and you're
comfortable saying you know what like
we're not burning hard enough to where
we need to worry about it
if you're in that stage or if you have a
lot of aws credits
yeah like exactly if you got 100k of aws
credits in the bank
like find product market fit and wait
for it to become a problem and
as long as your business isn't so
fundamentally flawed in the mechanics
that
you can't in the future engineer your
way out of it
that's fine like i you know in my days
of doing consulting
um i would often tell people like
you don't need to worry about this yet
like i'd have conversations with
architects who are
oh but this will cost someone that'll
cost so much guys we're running like
three services
you know and the throughput is low
and you don't need to worry about it
it's fine
but you know for us there are a couple
things that true of it
one is that we're a profitable business
and
we're essentially bootstrapped right um
so and we'd like to just continue to
remain profitable or if we're going to
operate at a loss
due to investing and growth when we
decide to do that
we still want to have a comfortable
cushion of cash we still want to
and we still want to know that when
we're adding customers we're adding to
the bottom line we're adding
uh we're not screwing up for gross
margin because
that also makes us a much more
attractive
you know if we ever wanted to be
acquired which you know
is not something really that's in the
cars right now like we're
comfortable running a profitable
business and want to but um
continue to do that for the foreseeable
future but um
you know if you if you ever did um well
people look at press margin that's one
of the numbers to plug into your
value of your company so there are a lot
of reasons to look at it for us
in particular it was can we offer
um enterprise contracts
at a discounted grade with certain
parameters certain limitations given
that we deeply understand a company's
usage pattern and can put some
limitations around that
you know what limitations do we need to
put around that the other thing that
it's
letting us do as well is explore other
other verticals that might have that we
don't really service as much right now
we do a bit
of but isn't a core focus area like uh
infrastructure monitoring where
the usage patterns tend to be very
different than in environmental iot
you know environmental iot for the most
part with some exceptions
is a relatively low frequency of data
relatively low per device you know data
demands of ingestion whereas
infrastructure monitoring they're just
they tend to blast you with a load of
data like as a car is driving over a
bridge or something
you know you're getting just blasted
with all of this very high resolution
data so uh looking at
those usage patterns and understanding
our cost basis for different operations
and mapping them to those new
those verticals allows us to say do we
want to get into this
what would we need to change about our
architecture if anything
in order to service this at a gross
margin that is
similar to our current risk margin on
most of our other verticals yeah that
makes sense
um so then can you share some details of
like how did you actually do this for
your business you mentioned your
multi-tenant and you can use aws heavily
um those are really common things that
other sas companies
are are kind of using so maybe some
details of
uh and and feel free to share like any
technology or tools you use as part of
that as well sure
sure yeah um so for us and i've done
this actually for
uh one or two other companies in my
consulting days but for us
this is actually probably one of the
harder ones that i've had to work out
because um you know
we have all this data coming in but we
do have some shared resources so when i
i took a step back and i said okay how
can we do this
and step one was let me just map out our
architecture
and so i literally like mapped out um
in a mirror board with sticky notes like
um
here's our architecture and you know
here's this service here's this
component here's this thing
um and did i did it in an
event storming style so i don't know if
you're familiar yeah okay so you
essentially
you uh lay down the
domain events that are uh the business
critical uh business significant events
that are happening in your system so for
us it'd be something like a
data source created or data source
registered um
acquisition triggered uh based on
schedule
uh acquisition triggered based on uh
you know device pushes data to us um
you know all of these different things
you map out these events and then you
map
out where in the architecture those
events correspond to
and then you start to say okay which of
these things drives cost
and what kind of costs are they related
to
i could even i'm gonna see if i i have a
safe to share copy that i could show you
guys um
but you do that and you create this
really rich
diagram and rich sort of uh thing that
you can visually look at and say
ah when this thing happens so when data
is ingested
when a acquisition is triggered then
that causes
okay well there's some cost on our
rabbit mq
but is that significant maybe maybe not
oh mongodb
that's going to trigger that okay when
one of our
transfer data transformation processes
runs it's pulling data from mongodb and
it's pushing it to mongodb
and it's also going to send an email
over here
so that has send grid or uh ses costs
and so you get a really nice
picture and i'll just share yeah sure
a tiny i guess i can't
share it oh it's recording that's okay
uh no i just clicked on the
multiple uh controller try that now
let's see
let's see lovely zoom setting there we
go all right so i'll just share the
portion of this that
i think is okay sure um
but basically what i did was
i mapped everything out and
just fell out a little bit and i
created this little map of like
here are all my costs okay storage cost
processing costs data transfer costs
third-party services
and different variables that are
impacting cost and you can see i
you know just leaned heavily on the
domain
design uh and event storming stuff uh
basically you're still focusing on like
your application
uh contents right you're not really
looking at the aws services or anything
like that yet you're still not high
level
exactly and so you start to see oh these
stars what is this
these like these stars um that's
interesting like
and we started to map things around like
um you know which of these things are
significant things that we might want to
then monitor
so that's what those stars actually mean
so once we mapped everything out
and we said okay these things are
driving different costs this drives the
cost this drives the cost
we look for the common choke points in
the architecture where it's sort of like
uh here's where we can monitor that and
that's when
uh that's where we drop into i'll stop
sharing now sure um because i think that
gives a taste um
and so you kind of map all of those
costs out and you can see in the diagram
where i had a storage cost
like a and a store and a
processing cost and this and
that and so then the stars meant
okay i actually need to go into the code
and instrument that
so um that's when we decided
okay well we need some sort of you know
easy quick data story to pull this
push things into pull data out of uh we
actually just used new relic for that
they've got a
pretty generous pre-tier and uh their
custom events were
pretty well suited to this we don't use
them for apm
particularly but uh for this use case it
just
really is nice because you can go in
there and it's sort of like
you can just play around with these time
series queries and they have an api that
you can pull the data out of
so we got the data into neural right but
that's not enough
that's just our essentially our usage
data so i had
at that point usage data of right things
like um
you know how frequently our data sources
by customer uh you know with the
customer ids
how frequently are those data sources
being
uh acquired so like how frequently are
we fetching data from them how
frequently are data sources that push
data
to us pushing data to us and how big are
the payloads
um then
based on that uh as you know that as
well as some other
metrics you know how frequently are we
sending emails things like that um
by customer we could then say all right
let's join that
with the aws data the from the cost and
usage report
right and this was actually ask a quick
question before you move on to that
um yeah roughly speaking how long did it
take you like to do this kind of
instrumentation is it fairly lightweight
sprinkling like some
uh i don't know some library calls here
and there with your new
api keys or did you have to correct a
lot of business heavy logic as well
because we went through the process
of identifying those
choke points that the places where we
really should instrument
and it turned out that when we really
sat down and analyzed it
you know there are some common points
that
are like the choke points where you can
just ah i can instrument it here and
here and that actually gives me an
accurate picture of everything that's
happening
okay there weren't too many places to
instrument
probably 10-ish
okay like there really weren't that many
right um
it wasn't very hard it took us maybe
i think i personally did it in maybe a
day
it wasn't very long right okay um
you were instrumental things like the
customer
id as well as like the i guess the
the point itself so you could then slice
that data and that's why
it kind of like helps you do the
multi-tenant side of things later on
right exactly
exactly and we would do like i
instrumented you know
um and i had some instrumentation in
there already just
for other things but so there were
some interfaces and things that i could
just and they could add to
so if you're already doing some like
instrumentation of your code
you'll probably know where you should
swap things down
um okay yeah you would add
you know customer information and then
as much information as you think you
need
you know more the better uh that you
then
would correlate so things like you know
payload sizes and
for us um you know the number of days
that a query spans the number of records
that were returned from that query
and you know how often they're doing
these queries and
so like everything that you think could
then correlate to an underlying
infrastructure cost
whether that's a cpu spike memory usage
uh storage copper
uh costs like iops um
anything that you even suspect to drag
that just throw it in there
and then you're going to want to do a
deeper dive to analyze that
okay and then you moved on to layering
on the cost and usage reports so this is
where you enabled the detailed
aws cost and usage reports i'm assuming
you did the one with the resource ids
it's like the most complicated
uh the fat table yeah yeah
the biggest you know whole shebang uh
custom usage report and
okay the first thing i did was i
actually just got that hooked up to
quicksite
um so i had it you know the custom usage
report feeding into
athena and quicksite and i started to
just
try to dig into the data to understand
like what's actually going on
uh and where are my major costs and
uh um actually i i had done that before
i even did this
uh cost attribution mapping um
so i already had in my head a little bit
around like okay these things cost a lot
of
money so you know i really need to make
sure that when i'm doing this
uh mapping of my architecture and when
i'm doing the instrumentation that
i idiot check that against you know
where i know i'm spending money
sure um so then why not aws cost
explorer at that point
it's not nearly granular enough um so
like we you know i started there
but uh there are things that you need to
drill down on and you know slice and
dice
based on the usage the type of operation
that was performed or something
exactly because for example you know a
lot of our stuff
uh you know some of it's on containers
in target but some of it's
a lot of its ec2 instances and the
burstable ones
and so you need to start really
understanding like when you're digging
into the stuff
where are my costs coming from uh and
how do you get billed for different
the different amazon or whatever your
cloud provider is
yeah how do you get billed for those
resources that you're using
in our case uh the burstable
instances in amazon you know that they
charge you get a certain number of cpu
credits and then
uh you know you use all of those and
they replenish over time but if you use
more than you're allotted
then you get a surcharge for cpu credits
right
that'll actually show up on your bill
you need to kind of understand that know
that and see that in cost explorer and
or in the cost and usage report rather
and start to say like oh this one's fine
like this service
is very low cpu utilization it never
gets pegged on cpu credits
okay cool this one wow i'm getting
charged for a lot of cpu credits on this
one oh that's interesting
so that actually helps you understand in
your architecture
like where you might also need to
instrument things so i think you know in
terms of an approach
looking at that usage data and getting
pretty familiar with it before you even
start mapping out
architecture and doing the domain event
stuff or at least concurrently with it
makes a lot of sense and then we're
looking at like do you need the hourly
granularity so if you see a
spike then you can kind of correlate
that spike to new relic to see like
absolutely 100 you do because
at least for us uh in our architecture
and our customers usage of our software
it's not constant like you know we have
some customers that pull out massive
amounts of data
every day to like you know into other
systems and
uh you know it's a pretty flexible api
and platform so you get people just
pulling out like
jobs and jobs of data or publishing in
bulk as well
okay uh so that means that our usage is
very spiky
so you know you might have uh sometimes
even if you're not auto scaling your
usage can still be spiky with those
versatile
cpu uh instances right
okay so then so you've got now these two
kind of rich
data sources and you can kind of
correlate them
then what yeah well i mean
i think the first thing was
in the costume usage report in quick
site
just really understanding like
which costs i could ignore and which
costs i could not
so you know the eventual goal was build
a spreadsheet or like a python program
or something
that where i could plug in a customer's
usage based on like
business relevant things so like
customer relevant
things like how many fields are you
sending me how often are you sending
them
and uh that kind of a thing and then
spit out
a number how much will this person cost
me and then be able to tweak certain
numbers and say
if we limit you to this we can charge
you less we can give you a discount
right so in order to do that you kind of
need to know which are your biggest
levers that are actually
variable costs and which ones are fixed
costs or or that you can pretend they're
fixed costs for now so for us we use
rabbitmq a lot internally
and we just have a big beefy amazon mq
managed rabbitmq cluster and it's kind
of a
you can pretend it's a fixed cost
because
it actually is a stepwise function but
like
it's you know to hit that next step
you're gonna have to add so much more
that it's like you know what
amortize that cost across all of your
customers
it comes out to like a few cents per
customer
who gives a crap right yeah
whereas uh you know we use heavily
for some of the data intensive
operations we use
s3 heavily for you know certain things
where we're receiving files
and uh those costs are much more
variable
and i could see that in the cost and
usage report in quick site
i could see what kinds of operations
were driving those costs
uh for manga that got much more
complicated i kind of
glossed over this but i actually had to
enable
bpc uh flow logs
and get that data as well into athena
visualize it with quick site and say
what things
are sending data where because we're a
data intensive application
right um if if you had you know just a
a little credit app that wasn't doing
much data munjing
you know probably wouldn't need that but
for us data transfer
cost costs were actually you know
they're a large portion of our build so
i needed to understand and be able to
attribute you know just like i needed to
be able to attribute a cpu spike
okay i need to attribute why
where is this data transfer coming from
is it you know from the suggestion box
is it from our you know processing
servers is it from
you know where where are they coming
from and
also how can i correlate that with you
know we use mongodb atlas which is
another hosted
service right so how can i correlate
which services are sending data
to the to atlas and different you know
atlas boxes
and thus how can i
apportion the atlas spend to the
different
operations that my customers
at the end of the day my customers are
doing right so you need to kind of
trace the trace through the architecture
and trace through
you know okay if if data transfer costs
are a big portion of it
well you kind of know where those are
coming from so the way we did it
you know get everything into a female so
get uh
get the vpc flow log data into athena
get the um
get the custom usage report data into
athena
and then the new relic stuff
we joined that in memory uh in a lambda
function so the way that we set
it up is get all the data into athena
from aws so the flow logs and the
uh custom usage report have a lambda
that
on a time interval joins that data up
with the relic data okay and then spits
out
a big csv okay and that enables the kind
of manual
analysis to be done where you can
actually plug in the customer
numbers on the other side or the
hypothetical future customers or
prospects exactly
see what the unity economics kind of
looks like i guess
and so like you know the next step from
getting that csv
the csv is basically your data joined up
in a really nice way
but you know i you know originally i
went down kind of a red herring of a
path trying to
use um different forms of
regression analysis so try to just say
can i fit
a can i just fit a curve to this
and like i see okay and that just didn't
work
like i i tried all sorts of different
you know regression analyses and using
um
gosh what was i using um
psychic learn and then i was like ah
maybe that's not good enough and i was
using these different
you know regression libraries and it
just didn't work
uh and when you thought it was working
it was because you were overfitting your
data right
so it's like that's interesting were you
trying to see if there is like a common
uh pattern where like like it doesn't
really matter
what um size a customer like everyone's
following the same kind of
uh curve right yeah we're trying to
simplify the problem essentially
i was but i've even broken it up so i
had
basically said what if i take the
customer out of it for a second and i
just look at
at a given hour uh what's the
utilization
of the different resources okay like cpu
and you know a few different things
what's the kind of input the business
relevant events so like you know
acquiring data and
you know number of records that are
being sent in and
all that stuff so take the
customer ids out of the equation um
can i just fit a curve that's gonna yeah
call it allow me to predict that because
then if i can do that then i get a
nice simple equation that you know hey
customer you do
you know you send me this many records
and
then i can give you a cost for that
right just doesn't work and the reason
why it doesn't work
after taking a step back from going down
that rabbit hole for a couple of days
was your costs aren't always these nice
continuous things
and there's so much more richness that
you need to apply
to your model than can be done really in
just
these simple linear progressions so
uh i took a step back and i said well
okay um
let me actually just look at how my
architecture is set up
for the things that are ec2 instances
that we
don't really auto scale up and down too
much because
we need we don't know when the burst
deload is going to happen
we just know that it will happen at
various times
and we need to handle it within our slas
so we can't really auto scale those up
too much we just need to be able to take
the load
let me look at the maximum load on those
resources
because really what we're paying for
there is the capacity
so we're not necessarily paying for the
usage so if i'm just looking at the
customer's usage coming in
well that doesn't really give me the
full picture
and even when i was doing my clever
machine learning
bs where i was trying to adjust for you
know cpu
normalized usage it just didn't work so
instead
i looked at the max costs
during times of max usage of a given
resource of a given thing
and then i said okay that's my capacity
cost
but there is some fixed uh some variable
cost that's
uh related to the actual amount of data
customers are sending me so let me model
those two things discreetly
so uh customer if you want to send me a
million records
there's some cost that i will charge you
if you want to send me
a million records per second well now my
capacity cost
has to go up versus if you're sending me
a million
records an hour so you have those you
know
uh two separate levers to play with
that in our case i needed to model
separately so
a lot of that kind of modeling for
example has to happen in a spreadsheet
and you have to really think through
like
what's my architecture what is my
infrastructure and
how does that map to stepwise functions
how does that map to
things that are where i have to just
absorb it and
i i should model it as a capacity cost
like
uh versus something that's truly
variable based on usage
okay that makes a lot of sense and that
is surprisingly complicated right oh
man it's it was very complicated
and um you know the the nice thing out
of these models though is you're not
trying to get perfect
but you are trying to get something
that's close enough that it's very
useful
and that's yeah
what is useful well i mean depends on
your use case but for us
i thought if i could get within 30 of
predicting this
that's good enough and you know
yeah okay cool very good because um
man otherwise it's like we
you go from having no idea what
something's gonna cost you
like are we going to completely lose our
shirts on this
contract to ah okay if it's ten percent
or if it's ten percent less you kind of
bake that in
and yeah that's fine right yeah we see
that a lot
actually it's uh our infracos users tell
us like
i know you're not a hundred percent
accurate like i don't want that actually
i just want an idea of like is this
going to like
kill me or is this just going to like
grow
or is this actually something i should
not spend any time on because it's
insignificant and i should just keep
going
yeah that's that's exactly it because
like it
you're not gonna get it perfect with
this yeah because so much of it is just
like
exactly it's so variable and
it's it it's just really hard
uh because there's so many factors that
can influence it
yeah definitely so then kind of stepping
back
um and if you were to like advise other
companies
who are kind of going through this or at
the start of this journey
where they're trying to look at the cost
attribution and the customers
um what were some of the things you that
you would advise them to do or like uh
do you have any tips
for them yeah so i think
number one ask yourself do you actually
need to do this
or can you just look at what's going on
in cost explorer or custom usage report
and
say yeah okay good enough like um
fine or you know something uh like infra
cost if you're about to make a big
architecture change you know like is
this gonna drastically change what i'm
spending
yeah that's good enough that's perfect
that's probably more than
most companies or most developers would
do
you know without the finance team having
to uh
chase them down to do it so you're
probably in a good spot
especially if your application is not
super resource intensive but if you're
doing things like
you know building a data intensive
application or
you know doing stuff where you're just
crunching
loads of numbers um i mean you'll
probably know
if you have one of those applications um
i wouldn't do it too early but if you're
gonna do it
um i think you know mapping out the
architecture using event storming and
then
trying to say which of these business
significant events
that are relevant to my customer can i
find a common choke point
in my event storming in my architecture
where i can
then measure those things and go in and
surgically insert
[Music]
some measurement of
of those business relevant things and
add all the data that you need
if you can do that and then
find a way to join that with your actual
cost data
and really think about what's your
architecture what are you being charged
for
are you being charged for capacity
variable usage that kind of a thing
then you're you're probably going to be
in a good spot and
the other piece of advice advice i would
give is
it is going to be frustrating it is
going to be hard and you're going to
think
is am i ever going to get to a
reasonable model
yep you're going to have to take a step
back a few times reassess analyze
uh you know but that's okay that's part
of this it's
just hard stuff it's hard a hard problem
to solve
so then this sounds like the kind of
thing you might need to revisit every
time you're about to make some major
architectural change or add like a new
component is that how you view it as
well
yeah i think so like um
especially if you're looking at
you know swapping out a major
component of your architecture or moving
and you should know though as well like
based on doing that once
if i change this thing if i change my
database in my case if i change which
database we're using
well okay that's going to change how
much data i'm probably transferring in
and out depending on whether it does
back compression
you know how chatty is it uh if i split
out databases per micro service where
previously maybe i had
you know one micro service now split
them into two like that might change
things around
so you'll probably know by doing this
once you'll probably be 80 to 90
of the way there um especially if you do
you know what we did which is uh for a
lot of this stuff
try to push as much of it into code as
you can like you know we have
lambda functions that are doing joining
and spitting out a csv
in a well-known format and that's like
90
of the effort right so i think you will
have to revisit it but hopefully
it's easier the next time and you'll
also build the muscle so part of this is
if you haven't done it before or even in
my case i've done a few of these before
but this
you know doing it for eagle was by far
the most complicated one i've done
it takes a little while to get your
brand thinking in that way
and to know the ins and outs of the
different aws infrastructure
costs and how they're charged so it'll
be easier over time but you definitely
should revisit it
you know if you're looking on at taking
on a massively different use case
with different usage patterns or
swapping out a major component of your
architecture
that's very cool and then just one final
question yeah
um how would you advise companies to
like do this stuff if the
one person uh like yourself who like
really knows the architecture like leads
this and then they kind of share the
knowledge with the rest of the company
or like um or do you get like a little
squat team or how would you advise like
who what kind of skills you need to do
successfully
so i think in terms of skills that you
need you need
a person or people who really know the
architecture
got it and you know part of that
can one thing that can really help with
that if you're new to a company like i
was
uh well still am actually uh
getting like some distributed tracing
going on if you have a microservices
architecture just so you can understand
like
wait a second when this thing happens 10
requests to that happen or
five queries to the database happen so
like you can kind of
uh idiot check your model as well to
make sure that like reality reflects
uh how you're modeling things um
so that that's a helpful shortcut to
kind of cheat and give you some of that
knowledge of the system
but definitely i would say uh you need
someone with knowledge of the system
and also knowledge of the
end users so i was asking a lot of
questions of
our guy who you know leads up
customer support and who's quite
technical as well
but to understand do customers ever do
this do customers ever do that hey i saw
something in a trace over here
like is that normal like i
it i only saw one instance of it when i
was querying for traces like that but
so having someone you can ask yeah okay
um the other thing i would say is you
need someone who
either knows or wants to know
way too much about aws uh
pricing and billing and i you know i
built that up just by like
diving in and doing it i i knew a bit
about it but it's
definitely a lot more now but you kind
of have to embrace it and really read
through all this stuff
so you need someone who's gonna you know
be happy to do that
so if you have those two things like the
understanding of the actual
user behavior to some extent the
understanding of the system
and understanding of the actual
underlying
uh dynamics of
the different pricing models for
whatever services you're using aws
sangria whoever uh that's really helpful
and the one other thing i'll say that is
useful
is to have someone who
has a bit of the business hat on so in
my case i kind of put that hat on right
but
um you know if you don't aren't really
inclined to think of pricing models
and maybe that's not really your forte
um
depending on the company maybe that's a
product manager maybe that's a sales
person maybe that's the ceo
someone who is thinking about
the actual pricing user facing
implications because you want to develop
a model that's useful as well
so um you need to kind of know what your
end goals are or what the possible
pricing schemes are that you might be
exploring to then
say is the stuff that i'm producing in
this model
actually useful totally makes sense
there's a
this is i think part of the reason this
kind of
exercise is also very difficult to do is
because it doesn't require just one
skill it requires a
variety of data sources and skills and
kind of context from different parts of
the business as well as the systems
oh that makes it very complicated
does thank you very much for taking time
to share that knowledge with the
community
uh we're going to record this put it on
youtube and um hopefully a lot more
people will
uh kind of learn and we're definitely
seeing a lot more companies
look at this stuff but the tools aren't
there the
like the knowledge is just not there so
i think this is
helpful thank you yeah thank you that's
uh fun to talk about this stuff
uh and yeah 100 right like i think
the stuff that you guys are doing uh
with infracost is really exciting as
well because
there just isn't enough awareness of
this in
the developer community uh even
even on the business side um so you know
the more that we can do to educate
people about
thinking about costs preferably earlier
rather than like her the better
so um yeah absolutely and you know
shameless plug as well
if you're interested in environmental
iot
like you know keeping the rivers flowing
making sure floods don't
uh cause catastrophes or dams don't
break
and uh you know really having a great
impact on the world but also
solving some really freaking cool
engineering problems
and product problems uh you know
we're uh going to be looking for quite a
number of
uh really smart kind empathetic
uh interested curious engineers
in the near to medium future so
yeah get in touch uh on twitter i'm sure
that we'll have links to yeah we'll add
links to your twitter and
um other links to your careers page as
well um
so people can reach out i think it's
very cool stuff you guys are working on
and it sounds like early in this space
where like there's going to be a lot of
stuff happening in that totally
future it's very exciting awesome thanks
again david
cheers thank you see ya 
