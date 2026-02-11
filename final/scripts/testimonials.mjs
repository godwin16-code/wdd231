// testimonials.mjs - Testimonials carousel management

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Food Blogger",
    text: "Harvest & Hearth is a culinary masterpiece. Every dish tells a story of local farms and sustainable practices. The seasonal menu keeps us coming back month after month.",
    rating: 5
  },
  {
    id: 2,
    name: "James Rodriguez",
    title: "Local Restaurant Critic",
    text: "The commitment to farm-to-table dining is evident in every bite. The chef's passion for local ingredients shines through in their innovative preparations.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    title: "Sustainable Living Advocate",
    text: "Finally, a restaurant that aligns with my values! Supporting local farmers while enjoying exceptional food is exactly what dining out should be.",
    rating: 5
  },
  {
    id: 4,
    name: "Michael Johnson",
    title: "Sommelier",
    text: "The wine pairings are exceptional. The restaurant's knowledge of local vineyards and sustainable farming practices is unmatched in our region.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Event Planner",
    text: "We hosted our wedding reception here and couldn't have been happier. The personalized service and farm-fresh cuisine made our day truly unforgettable.",
    rating: 5
  }
];

export function getTestimonials() {
  return testimonials;
}

export function getTestimonialById(id) {
  return testimonials.find(t => t.id === id);
}

export function getRandomTestimonial() {
  return testimonials[Math.floor(Math.random() * testimonials.length)];
}
