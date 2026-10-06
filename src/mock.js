// All content below is MOCK data for the mockup. Replace with the client's real
// numbers, reviews, photos and credentials before launch.

export const stats = [
  { n: 24, suffix: '/7', label: 'emergency dispatch line' },
  { n: 60, prefix: '< ', suffix: ' min', label: 'target arrival window' },
  { text: 'Since 2018', label: 'family-owned and operated on Maui' },
  { n: 5.0, suffix: ' / 5', label: 'average Google rating', decimals: 1 },
];

export const triage = [
  { icon: 'pipe', title: 'Burst or leaking pipe', sub: 'Water actively flowing', warn: 'Water and electricity do not mix', head: 'Stop the flow and protect your home',
    steps: ['Shut off the main water valve.', 'Switch off power to wet rooms at the breaker if it is safe.', 'Move valuables and furniture to dry ground.', 'Call us. We start extraction immediately.'] },
  { icon: 'storm', title: 'Flooding or storm intrusion', sub: 'Rain, runoff, roof leaks', warn: 'Possible contaminated water', head: 'Flood water needs professional handling',
    steps: ['Stay out of standing water near outlets.', 'Photograph the damage for your insurer.', 'Avoid using household appliances.', 'Call us for safe extraction and drying.'] },
  { icon: 'ac', title: 'Appliance or AC leak', sub: 'Washer, water heater, AC line', warn: 'Hidden moisture risk', head: 'Hidden water causes the worst damage',
    steps: ['Unplug the appliance and close its supply valve.', 'Mop surface water, leave the walls alone.', 'Run a fan only if the area is safe.', 'Book a moisture-mapping visit.'] },
  { icon: 'sewer', title: 'Sewage backup', sub: 'Toilet or drain overflow', warn: 'Health hazard. Do not touch', head: 'This is a biohazard. Keep clear',
    steps: ['Keep family and pets out of the area.', 'Do not flush or run any water.', 'Avoid all skin contact.', 'Call us for sanitized extraction.'] },
  { icon: 'building', title: 'Commercial property loss', sub: 'Office, retail, hospitality', warn: 'Downtime costs money', head: 'A fast-track plan to protect your business',
    steps: ['Secure the area and protect inventory.', 'Notify your property manager.', 'Call us. We stage crews for fast turnaround.', 'Get full documentation for your carrier.'] },
];

export const services = [
  { img: '/media/flooded-house.jpg', icon: 'drop', title: 'Disaster recovery and restoration', text: 'Flood, mold, odor and fire damage: assessment, mitigation and rebuild under one team.' },
  { img: '/media/water-pump.jpg', icon: 'pipe', title: 'Flood and water extraction', text: 'Burst pipes, appliance leaks and storm intrusion. Rapid extraction and moisture mapping.' },
  { img: '/media/mold-wall.jpg', icon: 'mold', title: 'Allergen and mold remediation', text: 'Containment, removal and verification of harmful growth and airborne allergens.' },
  { img: '/media/inspection.jpg', icon: 'wind', title: 'Odor control', text: 'Source removal and treatment so odors are eliminated, not masked.' },
  { img: '/media/hazmat.jpg', icon: 'sewer', title: 'Crime and trauma scene cleanup', text: 'Discreet biohazard cleanup and sanitization performed with proper protocols.' },
  { img: '/media/carpet-disinfect.jpg', icon: 'doc', title: 'Post-loss cleaning', text: 'Carpet, upholstery, tile and grout restoration, plus documentation for your claim.' },
];

export const steps = [
  { time: '0 to 1 hr', title: 'Dispatch', text: 'A live person answers, a crew rolls and the source is stopped.' },
  { time: '1 to 6 hrs', title: 'Extract and map', text: 'Standing water out, hidden moisture mapped with thermal imaging.' },
  { time: '6 to 72 hrs', title: 'Dry to standard', text: 'Commercial dehumidifiers and air movers, read and logged daily.' },
  { time: 'Day 3 to 5', title: 'Verify and restore', text: 'Dry standard confirmed, report sent to your insurer, repairs planned.' },
];

export const jobs = [
  { img: '/media/plumber.jpg', title: 'Kihei condo, second-floor leak', type: 'Burst supply line · Category 1 · Class 2', tag: 'Residential', result: 'Dry in 4 days', note: 'Three units protected', hue: 200 },
  { img: '/media/carpet-disinfect.jpg', title: 'Lahaina restaurant kitchen', type: 'Dishwasher line failure · Category 2 · Class 2', tag: 'Commercial', result: 'Reopened in 36 hrs', note: 'Single-day service lost', hue: 205 },
  { img: '/media/flooded-house.jpg', title: 'Makawao home, storm intrusion', type: 'Roof and wall cavity · Category 1 · Class 3', tag: 'Storm', result: 'Claim approved', note: 'Full moisture log', hue: 210 },
];

export const reviews = [
  { name: 'Kekoa M.', area: 'Kihei', text: 'They were at our door fast, explained everything and had the water out before we had finished our coffee.' },
  { name: 'Leilani R.', area: 'Wailuku', text: 'The moisture report made our insurance claim painless. Honestly impressive.' },
  { name: 'Dale T.', area: 'Lahaina', text: 'Professional, local and kind. They treated our home like their own.' },
];

export const areaPins = [
  { name: 'Lahaina', x: 100, y: 115 },
  { name: 'Kahului', x: 215, y: 142 },
  { name: 'Paia', x: 252, y: 118 },
  { name: 'Makawao', x: 282, y: 160 },
  { name: 'Kihei', x: 195, y: 205 },
];

export const faqs = [
  ['What should I do first after water damage in Maui?', 'Stop the water source if it is safe, turn off power to the affected area, move valuables to dry spots and call a mitigation team right away. Drying within 24 to 48 hours greatly reduces mold risk.'],
  ['How fast does mold grow after a leak in Hawaii?', 'Mold can begin within 24 to 48 hours, and Maui’s warm, humid climate speeds it up. Fast extraction and controlled drying are what prevent it.'],
  ['Do you work with insurance companies?', 'Yes. Every job is documented with photos, moisture maps and daily drying logs, and we coordinate directly with your adjuster on covered losses.'],
  ['How long does structural drying take?', 'Most homes dry in 3 to 5 days depending on materials and how far the water spread. We take readings every day until dry standards are met.'],
  ['How much does water mitigation cost?', 'Cost depends on the water category, the area affected and the materials involved. You get a clear scope after the on-site assessment, and covered losses are usually billed to insurance.'],
  ['Which areas of Maui do you serve?', 'South Side (Kihei, Wailea), Central Maui (Kahului, Wailuku), West Maui (Lahaina), the North Shore (Paia) and Upcountry (Makawao, Kula, Haiku, Pukalani).'],
  ['Are your cleaning products safe for children and pets?', 'We use toxin-free products wherever the job allows, and we tell you before any treatment that needs the area to be vacated.'],
  ['Do you handle crime and trauma scene cleanup?', 'Yes. Biohazard cleanup is performed discreetly with proper protective protocols and full sanitization.'],
  ['Can I stay in my home during drying?', 'Often yes. We will tell you which rooms are safe, and equipment is set up to keep disruption low.'],
  ['What is the difference between water mitigation and restoration?', 'Mitigation stops the damage: extraction, drying and mold prevention. Restoration rebuilds what was damaged: drywall, flooring and paint. We do both under one team.'],
];

export const areaOptions = ['South Side (Kihei, Wailea)', 'Central Maui (Kahului, Wailuku)', 'West Maui (Lahaina)', 'North Shore (Paia)', 'Upcountry (Makawao, Kula, Haiku, Pukalani)'];

export const credentials = [
  'Family-owned and locally operated',
  'Fully insured, liability coverage',
  'Certified carpet, tile and grout technicians',
  'Toxin-free products, safe for kids and pets',
  'Direct insurance billing',
];

export const categories = [
  { cat: 'Category 1', source: 'Clean water', example: 'Supply line break, sink or tub overflow', note: 'Can degrade to Category 2 within 24 to 48 hours' },
  { cat: 'Category 2', source: 'Gray water', example: 'Washing machine or dishwasher discharge', note: 'Significant contamination. Requires controlled removal' },
  { cat: 'Category 3', source: 'Black water', example: 'Sewage backup, rising flood water', note: 'Grossly contaminated. Affected porous materials are removed' },
];

export const classes = [
  { cls: 'Class 1', text: 'Minimal absorption. Affected area is a small part of a room.' },
  { cls: 'Class 2', text: 'Whole room affected. Water wicked up walls less than 24 in.' },
  { cls: 'Class 3', text: 'Water from overhead. Ceilings, walls and insulation saturated.' },
  { cls: 'Class 4', text: 'Specialty drying of low-permeance materials such as hardwood and concrete.' },
];

export const sectors = [
  { title: 'Residential', text: 'Single-family homes, condos and vacation rentals.' },
  { title: 'Property management', text: 'HOAs, multi-unit buildings and managed portfolios.' },
  { title: 'Hospitality', text: 'Hotels, resorts and short-term rental operators.' },
  { title: 'Food service and retail', text: 'Restaurants, kitchens and storefronts with downtime risk.' },
  { title: 'Offices and healthcare', text: 'Clinics, offices and facilities with compliance needs.' },
];

export const about = {
  title: 'Family-owned. Maui-based.',
  text: 'A local team that treats every property like our own. From the first call to the final moisture reading, you deal with the same people, and you get straight answers about what is wrong, what it takes and how long it will take.',
  points: ['Established 2018', 'Locally owned and operated', 'Fully insured', 'Serving all of Maui'],
};

export const reel = [
  { src: '/media/leak-pipes.mp4', label: 'Source control', text: 'Find the leak, isolate it, stop the damage.' },
  { src: '/media/plumber-faucet.mp4', label: 'Repair', text: 'Fix the failure so it cannot happen again.' },
  { src: '/media/carpet-cleaning.mp4', label: 'Post-loss cleaning', text: 'Clean, sanitize and return the space to use.' },
];

export const pillars = [
  { icon: 'clock', title: 'Fast, local response', text: 'Crews are staged across Maui and dispatched within the hour, any hour. The sooner water is out, the less of your home is lost.' },
  { icon: 'meter', title: 'Measured, documented drying', text: 'Moisture is mapped on day one and logged every day after. You get proof the structure is dry, not a guess.' },
  { icon: 'shield', title: 'Insurance handled', text: 'Photos, readings and itemized estimates go straight to your adjuster, so your claim moves without the back and forth.' },
];

export const signs = [
  { icon: 'stain', title: 'Ceiling or wall stains', text: 'Yellow or brown rings usually mean water is moving through the structure above.' },
  { icon: 'smell', title: 'A musty smell', text: 'Persistent damp odors often point to hidden moisture or early mold growth.' },
  { icon: 'floor', title: 'Warped or lifting floors', text: 'Cupping, buckling and loose tile are signs water has reached the subfloor.' },
  { icon: 'paint', title: 'Peeling or bubbling paint', text: 'Moisture behind a wall pushes paint and drywall surface outward.' },
  { icon: 'bill', title: 'A sudden spike in your water bill', text: 'An unexplained increase can reveal a slab or in-wall leak you cannot see.' },
  { icon: 'mold', title: 'Visible mold or spotting', text: 'Dark patches in corners, closets or around windows need professional assessment.' },
];

export const causes = [
  { title: 'Aging plumbing', text: 'Supply lines, fittings and water heaters fail without warning, often inside walls.' },
  { title: 'Heavy rain and storm intrusion', text: 'Wind-driven rain finds gaps in roofs, flashing and windows during island storms.' },
  { title: 'AC condensate lines', text: 'Clogged drain lines overflow into ceilings and closets, common in humid climates.' },
  { title: 'Appliance failures', text: 'Washing machine hoses, dishwashers and ice-maker lines are frequent culprits.' },
  { title: 'Flash flooding and runoff', text: 'Short, intense rainfall can push water through doors and low-lying slabs.' },
  { title: 'Persistent humidity', text: 'Maui humidity slows drying and lets small leaks turn into mold problems fast.' },
];
