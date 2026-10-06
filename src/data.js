export const PHONE = '(808) 000-0000';
export const PHONE_HREF = 'tel:+18080000000';
export const LOGO = '/logo.svg';

// The five stages of a water-mitigation job. Each stage is one "destination".
export const stageList = ['Respond', 'Extract', 'Dry', 'Verify', 'Restore'];

export const states = {
  respond: {
    name: 'Respond', number: '[02]', next: 'Extract', nextKey: 'extract',
    scene: 'respond', portalScene: 'extract', cursor: 'Next',
    facts: [
      ['Window:', 'A crew is dispatched within the hour, any hour, any day of the week.'],
      ['Line:', 'A live person answers 24/7. No voicemail, no call centre.'],
      ['First move:', 'Find the source, shut it off and make the space safe.'],
      ['Coverage:', 'South Side, Central, West Maui, North Shore and Upcountry.'],
    ],
  },
  extract: {
    name: 'Extract', number: '[03]', next: 'Dry', nextKey: 'dry',
    scene: 'extract', portalScene: 'dry', cursor: 'Next',
    facts: [
      ['Equipment:', 'Truck-mount extractors and submersible pumps.'],
      ['Speed:', 'Standing water out in the first hours, before it wicks into walls.'],
      ['Mapping:', 'Thermal imaging and moisture meters find the water you cannot see.'],
      ['Why fast:', 'Mold can start within 24 to 48 hours in Hawaii’s humidity.'],
    ],
  },
  dry: {
    name: 'Dry', number: '[04]', next: 'Verify', nextKey: 'verify',
    scene: 'dry', portalScene: 'verify', cursor: 'Next',
    facts: [
      ['Method:', 'Commercial air movers and LGR dehumidifiers.'],
      ['Maui factor:', 'Island humidity slows drying, so equipment is tuned for it.'],
      ['Duration:', 'Most structures dry in 3 to 5 days, measured every day.'],
      ['Goal:', 'Dry to standard, not just dry to the touch.'],
    ],
  },
  verify: {
    name: 'Verify', number: '[05]', next: 'Restore', nextKey: 'restore',
    scene: 'verify', portalScene: 'restore', cursor: 'Next',
    facts: [
      ['Readings:', 'Daily moisture logs for every wet surface.'],
      ['Proof:', 'Photos and a drying report ready for your insurer.'],
      ['Insurance:', 'We work directly with adjusters on covered losses.'],
      ['Sign-off:', 'Equipment leaves only when readings hit the dry standard.'],
    ],
  },
  restore: {
    name: 'Restore', number: '[Call]', next: 'Free inspection', nextKey: null,
    scene: 'restore', portalScene: 'restore', cursor: 'Call',
    facts: [
      ['Repairs:', 'Drywall, flooring, paint and rebuild handled by one team.'],
      ['Mold:', 'Prevention first, safe remediation if growth is found.'],
      ['Result:', 'Your home back to pre-loss condition.'],
      ['Next step:', `Call ${'(808) 000-0000'} for a free inspection.`],
    ],
  },
};

export const areas = ['Kihei', 'Wailea', 'Kahului', 'Wailuku', 'Lahaina', 'Paia', 'Makawao', 'Kula', 'Haiku', 'Pukalani'];

export const services = [
  'Disaster recovery and restoration',
  'Flood and water extraction',
  'Allergen and mold remediation',
  'Odor control',
  'Crime and trauma scene cleanup',
  'Post-loss cleaning',
];

export const faqs = [
  ['What should I do first after water damage in Maui?', 'Stop the water source if it is safe, turn off power to affected areas, move valuables to dry spots and call a mitigation team right away. Drying within 24 to 48 hours greatly reduces mold risk.'],
  ['How fast does mold grow after a leak in Hawaii?', 'Mold can begin within 24 to 48 hours, and Maui’s warm, humid climate speeds it up. Fast extraction and controlled drying are what prevent it.'],
  ['Do you work with insurance companies?', 'Yes. Every job is documented with photos, moisture maps and daily drying logs, and we can coordinate directly with your adjuster.'],
  ['How long does structural drying take?', 'Most homes dry in 3 to 5 days depending on materials and how far the water spread. We measure daily until dry standards are met.'],
];

// What the portal card shows about the destination (the stage a click moves to).
export const previews = {
  extract: {
    num: '02', title: 'Extract', visual: 'level',
    img: '/media/card-extract.jpg', pos: '50% 35%',
    stat: ['Standing water', '100%', '0%'],
    lines: ['Truck-mount extractors and pumps', 'Thermal imaging finds hidden wet areas'],
  },
  dry: {
    num: '03', title: 'Dry', visual: 'humidity',
    img: '/media/card-dry.jpg', pos: '50% 60%',
    stat: ['Indoor humidity', '78%', '45%'],
    lines: ['Dehumidifiers and air movers', 'Typically 3 to 5 days'],
  },
  verify: {
    num: '04', title: 'Verify', visual: 'readings',
    img: '/media/card-verify.jpg', pos: '50% 30%',
    rows: [['Living room wall', '14%', 'wet'], ['Subfloor', '11%', 'wet'], ['Bedroom wall', '8%', 'ok'], ['Hallway', '6%', 'dry']],
    lines: ['Daily moisture log per surface', 'Report ready for your adjuster'],
  },
  restore: {
    num: '05', title: 'Restore', visual: 'checklist',
    img: '/media/card-restore.jpg', pos: '50% 35%',
    items: ['Drywall and insulation', 'Flooring and trim', 'Paint and finish', 'Final walkthrough'],
    lines: ['One team handles the rebuild'],
  },
  call: {
    num: 'Call', title: 'Free inspection', visual: 'call',
    img: '/media/card-call.jpg', pos: '50% 28%',
    lines: ['A crew lead walks the property and writes the scope of work.'],
  },
};
