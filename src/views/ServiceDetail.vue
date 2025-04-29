<template>
  <div class="service-detail-page">
    <header>
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">
              <img src="/images/logo.png" alt="TBI Building Restoration Logo">
            </router-link>
          </div>
          <button class="mobile-nav-toggle" @click="toggleMobileNav">
            <i :class="['fas', mobileNavActive ? 'fa-times' : 'fa-bars']"></i>
          </button>
          <nav :class="{ active: mobileNavActive }">
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/#about">About</router-link></li>
              <li><router-link to="/#projects">Projects</router-link></li>
              <li><router-link to="/#services">Services</router-link></li>
              <li><router-link to="/#contact">Contact</router-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <section class="service-hero" v-if="service">
      <div class="container">
        <div class="service-hero-content">
          <h1>{{ service.title }}</h1>
          <div class="breadcrumbs">
            <router-link to="/">Home</router-link> /
            <router-link to="/#services">Services</router-link> /
            <span>{{ service.title }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="service-detail" v-if="service">
      <div class="container">
        <div class="service-content">
          <div class="service-description" v-html="service.description"></div>

          <div class="service-image">
            <img :src="service.gallery[0]" :alt="service.title" class="main-service-image">
          </div>

          <div class="other-services">
            <h3>Other Services</h3>
            <div class="other-services-grid">
              <div
                  v-for="otherService in otherServices"
                  :key="otherService.id"
                  class="other-service-card">
                <router-link :to="`/service/${otherService.id}`">
                  <img :src="otherService.image" :alt="otherService.title">
                  <h4>{{ otherService.title }}</h4>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="service-contact">
          <h3>Interested in this service?</h3>
          <p>Contact us for a free consultation and quote</p>
          <router-link to="/#contact" class="cta-button">Get a Free Quote</router-link>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>About TBI</h3>
            <p>TBI Building Restoration Inc. provides expert waterproofing and restoration services for commercial and industrial properties. We take pride in quality workmanship, great customer service, and competitive prices.</p>
            <div class="social-links">
              <a v-for="(social, index) in socialLinks"
                 :key="index"
                 @click="goToSocialLink(social.url)"
                 href="javascript:void(0)">
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li v-for="service in services" :key="service.id">
                <router-link :to="`/service/${service.id}`">{{ service.title }}</router-link>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/#about">About</router-link></li>
              <li><router-link to="/#services">Services</router-link></li>
              <li><router-link to="/#contact">Contact</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Contact Info</h3>
            <p v-for="(contact, index) in contactInfo" :key="index">
              <i :class="contact.icon"></i> {{ contact.text }}
            </p>
          </div>
        </div>

        <div class="copyright">
          <p>&copy; {{ new Date().getFullYear() }} TBI Building Restoration Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      mobileNavActive: false,
      services: [
        {
          id: 0,
          title: "HOT-APPLIED WATERPROOFING",
          description: `<h3>Hot-Applied Waterproofing For New Construction & Existing Building Repairs</h3>
  <p>At TBI Building Restoration, we provide professional hot rubberized asphalt waterproofing services for both new construction projects and repairs on existing buildings. Whether you're developing a brand-new commercial complex or need to restore and waterproof an aging structure, our experienced team delivers reliable, high-performance solutions that protect your property from water intrusion for decades.</p>

  <h4>What is Hot Rubberized Asphalt Waterproofing?</h4>
  <p>Hot rubberized asphalt is a hot-applied, seamless waterproofing membrane that forms a tough, flexible barrier once it cools and cures. Heated to around 180–200°C (350–400°F), the material is applied in liquid form directly to concrete or other substrates, where it adheres tightly and cures into a durable, rubber-like surface.</p>

  <p>It's especially ideal for:</p>
  <ul>
    <li>Below-grade walls and foundations</li>
    <li>Roof decks and green roofs</li>
    <li>Parking garages and podium slabs</li>
    <li>Terraces and planters</li>
  </ul>

  <h4>Why Choose Us?</h4>
  <p>We are a trusted name in the waterproofing industry, known for our detail-oriented approach and high-quality workmanship. From new construction to complex repair work on aging infrastructure, we bring the same level of expertise and care to every project.</p>

  <p>Here's why clients choose us again and again:</p>
  <ul>
    <li>New & Existing Building Expertise: We handle everything from brand-new installations to tricky retrofits and repairs on old structures.</li>
    <li>Certified and Experienced Crews: All our technicians are trained, experienced, and fully certified.</li>
    <li>Seamless Installation: We ensure proper material heating, surface prep, and application for a flawless, leak-proof finish.</li>
    <li>Thorough Surface Prep: We take time to properly clean, prime, and prepare surfaces for maximum adhesion and performance.</li>
    <li>Warranty-Backed Work: We stand behind every job with dependable warranties and follow-up support.</li>
  </ul>

  <h4>We Work with Top Manufacturers</h4>
  <p>We source our hot rubberized asphalt from some of the most trusted names in the industry like Henry Bakor and Carlisle Coatings.</p>

  <h4>Benefits of Hot Rubberized Asphalt Waterproofing:</h4>
  <ul>
    <li>Seamless Barrier: Eliminates joints and seams where leaks typically occur.</li>
    <li>Durable and Long-Lasting: Withstands building movement, traffic, and extreme weather.</li>
    <li>Flexible: Adapts to structural shifts without cracking or splitting.</li>
    <li>Chemical and Salt Resistant: Ideal for parking decks and areas exposed to contaminants.</li>
    <li>Compatible with Multiple Systems: Works well with insulation, protection boards, drainage layers, and green roofing assemblies.</li>
  </ul>

  <p>Whether you're waterproofing a new high-rise or restoring an older property, we're here to help with proven systems, expert crews, and reliable results.</p>`,
          image: '/images/service1/service.jpg',
          gallery: [
            '/images/service1/service1.jpg',
            '/images/service1/service2.jpg',
            '/images/service1/service3.jpg',
            '/images/service1/service4.jpg',
            '/images/service1/service5.jpg',
            '/images/service1/service6.jpg'
          ]
        },
        {
          id: 1,
          title: "VEHICULAR TRAFFIC COATINGS",
          description: `<h3>Vehicular Traffic Coating Systems For New Construction & Restoration Projects</h3>
  <p>At TBI Building Restoration, we provide high-performance vehicular traffic coating systems for both new construction projects and repairs or restoration of existing parking structures. These coatings are designed to handle the rigors of daily vehicle traffic while protecting concrete surfaces from water, salts, oil, fuel, and other damaging elements.</p>

  <p>Our team has extensive experience working on:</p>
  <ul>
    <li>Parking garages and multi-level structures</li>
    <li>Rooftop parking decks</li>
    <li>Drive lanes and ramps</li>
    <li>Loading docks and delivery areas</li>
  </ul>

  <p>We apply industry-leading, elastomeric traffic coating systems that provide a seamless waterproof barrier, enhanced traction, and long-lasting durability under heavy vehicle loads.</p>

  <h4>Why Choose Our Services?</h4>
  <ul>
    <li>Experts in New & Existing Structures: We handle everything from fresh applications on new decks to resurfacing and recoating older, damaged parking structures.</li>
    <li>Factory-Certified Installers: Our team is fully trained and certified to install top products like Tremco and Neogard systems.</li>
    <li>Meticulous Surface Preparation: Every project starts with thorough cleaning, crack treatment, and priming to ensure proper adhesion.</li>
    <li>Durable, High-Performance Finishes: Designed to withstand traffic abrasion, impact, temperature changes, and chemical exposure.</li>
    <li>Quick, Professional Turnarounds: We work efficiently to minimize downtime and disruption to your operations.</li>
  </ul>

  <h4>Our Go-To Coating Systems Include:</h4>
  <ul>
    <li>Tremco Vulkem® Vehicular Coating Systems</li>
    <li>Neogard® Vehicular Coatings (by Hempel)</li>
    <li>Sikalastic®-720/745 Systems</li>
    <li>MasterSeal® Traffic 2000/2500 (Formerly BASF)</li>
  </ul>

  <p>These systems meet or exceed industry standards for performance, flexibility, adhesion, and longevity.</p>

  <h4>Key Benefits:</h4>
  <ul>
    <li>Waterproof Protection: Prevents water, chloride, and salt penetration that can cause concrete deterioration and rebar corrosion.</li>
    <li>Durable & Crack-Bridging: Handles heavy traffic while accommodating thermal and structural movement.</li>
    <li>Slip-Resistant & UV-Stable: Enhances safety and surface life with UV and abrasion resistance.</li>
    <li>Chemical Resistance: Resists oil, gasoline, antifreeze, and deicing chemicals.</li>
    <li>Custom Colors & Striping Options: For enhanced visibility and traffic flow.</li>
  </ul>

  <p>From commercial high-rises to municipal parking facilities, we deliver dependable, long-lasting vehicular traffic coating solutions tailored to your project needs.</p>`,
          image: '/images/service2/service1.jpg',
          gallery: [
            '/images/service2/service1.jpg',
            '/images/service2/service2.jpg',
            '/images/service2/service3.jpg',
            '/images/service2/service4.jpg',
            '/images/service2/service5.jpg'
          ]
        },
        {
          id: 2,
          title: "PEDESTRIAN TRAFFIC COATINGS",
          description: `<h3>Pedestrian Traffic Coating Systems</h3>
  <h4>Durable Protection for Walkways, Terraces & Common Areas</h4>
  <p>Our company installs pedestrian traffic coating systems for both new construction and refurbishment of high-traffic pedestrian areas. These flexible, slip-resistant coatings are ideal for protecting concrete surfaces while offering aesthetic appeal and comfort underfoot.</p>

  <p>We work on a wide range of pedestrian surfaces, including:</p>
  <ul>
    <li>Balconies and terraces</li>
    <li>Mechanical rooms</li>
    <li>Walkways, breezeways, and corridors</li>
    <li>Rooftop decks and patios</li>
    <li>Stadium seating and concourses</li>
    <li>Stairwells and pedestrian bridges</li>
    <li>Plaza decks and communal spaces</li>
  </ul>

  <p>These coatings are specifically engineered for foot traffic, delivering waterproofing, UV protection, and excellent slip resistance.</p>

  <h4>Why Work With Us?</h4>
  <ul>
    <li>New Construction & Retrofits: We specialize in coating new surfaces and restoring worn pedestrian areas.</li>
    <li>Expert Application: Our certified installers ensure correct prep, detailing, and membrane application for long-term performance.</li>
    <li>Seamless, Flexible Coatings: Designed to move with the structure while maintaining waterproof integrity.</li>
    <li>Aesthetic & Functional: Available in a variety of colors and textures to match your design vision.</li>
  </ul>

  <h4>Preferred Coating Products We Use:</h4>
  <ul>
    <li>Tremco Vulkem® Pedestrian Systems</li>
    <li>Neogard® Peda-Gard® Systems</li>
    <li>Sikalastic® Pedestrian Systems</li>
    <li>MasterSeal® 1500 Systems (Formerly BASF)</li>
  </ul>

  <p>These coatings combine durability with design flexibility, making them ideal for areas where visual appeal and protection are equally important.</p>

  <h4>Benefits of Pedestrian Coatings:</h4>
  <ul>
    <li>Waterproofing: Protects structures from water penetration and weather damage.</li>
    <li>Slip Resistance: Keeps walking areas safe and compliant, even when wet.</li>
    <li>UV and Weather Resistance: Withstands sun exposure, rain, and freeze-thaw cycles.</li>
    <li>Crack-Resistance: Handles movement without breaking or peeling.</li>
    <li>Low Maintenance: Easy to clean and maintain with excellent long-term performance.</li>
  </ul>

  <p>Whether you're finishing a new residential building, renovating a commercial rooftop deck, or upgrading common areas in a multi-unit complex, we deliver dependable pedestrian coating systems that last.</p>`,
          image: '/images/service3/service1.jpg',
          gallery: [
            '/images/service3/service1.jpg',
            '/images/service3/service2.jpg',
            '/images/service3/service3.jpg',
            '/images/service3/service4.jpg',
            '/images/service3/service5.jpg',
            '/images/service3/service6.jpg'
          ]
        },
        {
          id: 3,
          title: "PATIO SLABS INSTALLATION",
          description: `<h3>Patio Stone Installation on Terraces and Rooftops</h3>
  <p>Transform your rooftop or terrace into a beautiful, functional outdoor space with expert patio stone installation from TBI Building Restoration.</p>

  <h4>Why Patio Stones Are Ideal for Rooftops and Terraces</h4>
  <p>Patio stones offer a sleek, low-maintenance, and weather-resistant solution for rooftop and terrace surfacing. They provide excellent drainage, resist cracking from temperature extremes, and allow for easy access to waterproof membranes below. With a wide range of styles, colors, and stone types, they can be tailored to complement any architectural style.</p>

  <h4>Our Approach: Precision Meets Performance</h4>
  <p>We use advanced installation systems—such as adjustable pedestal supports or high-performance bedding materials—to ensure a perfectly level surface while protecting the underlying structure. Our team evaluates load-bearing capacities, drainage needs, and waterproofing compatibility to guarantee a safe and seamless result.</p>

  <h4>Why Choose Us?</h4>
  <ul>
    <li>Specialized Expertise: Installing stone on rooftops and terraces requires a different set of skills than ground-level work. We understand the structural, technical, and logistical considerations involved—and we get it right the first time.</li>
    <li>Attention to Detail: Every tile is placed with care. From edge details to slope correction and water flow management, we don't cut corners—unless it's to custom-fit a stone.</li>
    <li>Quality Materials: We source premium patio stones and supporting systems designed specifically for elevated installations.</li>
    <li>Clean, Professional Crews: Our team works cleanly, safely, and with minimal disruption, respecting both the property and its occupants.</li>
  </ul>

  <p>Let us help you bring your rooftop vision to life with the lasting beauty of stone. Contact us today for a consultation.</p>`,
          image: '/images/service4/service1.jpg',
          gallery: [
            '/images/service4/service1.jpg',
            '/images/service4/service2.jpg',
            '/images/service4/service3.jpg',
            '/images/service4/service4.jpg'
          ]
        },
        {
          id: 4,
          title: "CONCRETE RESTORATION",
          description: `<h3>Concrete Restoration & Finishing</h3>
  <p>Restore the strength, safety, and appearance of your concrete surfaces—on the ground or at height. At our company, we specialize in high-quality concrete restoration and finishing for both residential properties and multi-storey buildings. From cracked balconies and rooftop slabs to worn-out patios, we deliver durable, beautiful results that stand the test of time.</p>

  <h4>Residential and Building Concrete Experts</h4>
  <p>We work on everything from private homes and townhouses to apartment buildings, condos, and commercial rooftops. Whether we're repairing a single balcony or resurfacing an entire terrace level, our team has the experience and systems in place to get the job done efficiently, safely, and with lasting results.</p>

  <h4>Restore. Reinforce. Refinish.</h4>
  <p>Concrete takes a beating from the elements, and over time, cracks, scaling, and surface wear are inevitable. We assess the condition thoroughly, repair structural and cosmetic damage, and apply finishing solutions designed for both aesthetics and durability. We also work closely with property managers and engineers when structural concerns or load requirements come into play.</p>

  <h4>Finishing Touches That Last</h4>
  <p>Once repaired, we apply finishes that protect and elevate the surface—ranging from slip-resistant sealers to decorative overlays, broom finishes, or exposed aggregate looks. Our finishing options are ideal for both safety and style, and can be tailored to suit everything from a private patio to a shared rooftop amenity.</p>

  <h4>Why Clients Choose Us</h4>
  <ul>
    <li>Residential & Building Experience: We understand the unique needs of homeowners, property managers, and building owners alike. We adapt our workflow to suit the environment—whether it's a backyard or a 15th-floor balcony.</li>
    <li>Lasting Results: Our restoration techniques focus on long-term durability, using high-performance repair mortars, bonding agents, and protective coatings.</li>
    <li>Customized Finishes: Every surface is different. We help you choose a finish that works for your space, your lifestyle, and your building's aesthetic.</li>
    <li>Clean, Safe, Professional: Our crews are trained to work cleanly and respectfully, especially in multi-residential settings where noise and dust control are essential.</li>
  </ul>

  <h4>Concrete That Works as Hard as You Do</h4>
  <p>Whether you're upgrading your home or maintaining a building, our concrete restoration and finishing services deliver reliability, performance, and curb appeal. Let's bring your concrete back to life.</p>`,
          image: '/images/service5/service1.jpg',
          gallery: [
            '/images/service5/service1.jpg',
            '/images/service5/service2.jpg',
            '/images/service5/service3.jpg',
            '/images/service5/service4.jpg',
          ]
        },
      ],
      socialLinks: [
        { icon: "fab fa-facebook-f" , url : "https://www.facebook.com/profile.php?id=61575634956799"},
        // { icon: "fab fa-twitter" },
        { icon: "fab fa-linkedin-in" , url :"https://www.linkedin.com/company/tbi-building-restoration-inc/about/?viewAsMember=true"},
        // { icon: "fab fa-instagram" }
      ],
      contactInfo: [
        { icon: "fas fa-phone", text: "647-997-5112" },
        { icon: "fas fa-phone", text: "416-871-4194" },
        { icon: "fas fa-envelope", text: "avtandil@tbicontractors.ca" },
        { icon: "fas fa-map-marker-alt", text: "Canyon Ave, Toronto, ON M3H4Y2" }
      ]
    };
  },
  computed: {
    service() {
      return this.services.find(service => service.id === parseInt(this.id));
    },
    otherServices() {
      return this.services.filter(service => service.id !== parseInt(this.id));
    }
  },
  methods: {
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive;
    },
    goToSocialLink(url) {
      if (url) {
        window.open(url, '_blank');
      }
    },
  },
  mounted() {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
/* Header styling is similar to Home.vue */
header {
  background-color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 60px;
  width: 350px;
  object-fit: cover;
}

nav ul {
  list-style: none;
  display: flex;
}

nav ul li {
  margin-left: 75px;
}

nav ul li a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: var(--secondary-orange);
}

.mobile-nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-blue);
}

/* Service Hero Section */
.service-hero {
  padding: 150px 0 80px;
  background-color: var(--primary-blue);
  color: white;
  text-align: center;
}

.service-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.breadcrumbs {
  font-size: 0.9rem;
}

.breadcrumbs a {
  color: var(--secondary-orange);
  text-decoration: none;
}

.breadcrumbs span {
  color: white;
}

/* Service Detail Section */
.service-detail {
  padding: 80px 0;
}

.service-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.service-description{
  line-height: 1.6;
}
/* Fix 1: Use >>> or ::v-deep to target elements inside v-html content when using scoped styles */
.service-description >>> h3,
.service-description :deep() h3 {
  font-size: 2rem;
  color: var(--primary-blue);
  margin-bottom: 20px;
}

.service-description >>> h4,
.service-description :deep() h4 {
  font-size: 1.5rem;
  color: var(--primary-blue);
  margin: 25px 0 15px;

}

.service-description >>> ul,
.service-description :deep() ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.service-description >>> li,
.service-description :deep() li {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Fix 2: Alternative approach - remove the "scoped" attribute from your style tag
   and update the class names to be more specific to avoid conflicts */
.service-detail-page .service-description h3 {
  font-size: 2rem;
  color: var(--primary-blue);
  margin-bottom: 20px;
}

.service-detail-page .service-description h4 {
  font-size: 1.5rem;
  color: var(--primary-blue);
  margin: 25px 0 15px;
}

/* Fix existing paragraph styles */
.service-description p {
  line-height: 1.6; /* Changed from 2.6 which seems excessive */
  color: var(--dark-gray);
  font-size: 1.1rem;
  margin-bottom: 15px;
}

/* Service Image - Updated to show single image */
.service-image {
  margin: 30px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.main-service-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
}

.main-service-image:hover {
  transform: scale(1.02);
}

/* Other Services Section */
.other-services {
  margin-top: 50px;
}

.other-services h3 {
  font-size: 1.8rem;
  color: var(--primary-blue);
  margin-bottom: 20px;
}

.other-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.other-service-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.other-service-card:hover {
  transform: translateY(-10px);
}

.other-service-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.other-service-card h4 {
  padding: 15px;
  color: var(--primary-blue);
  text-align: center;
  font-size: 1rem;
}

.other-service-card a {
  text-decoration: none;
}

/* Service Contact Section */
.service-contact {
  margin-top: 60px;
  text-align: center;
  padding: 40px;
  background-color: var(--light-gray);
  border-radius: 10px;
}

.service-contact h3 {
  font-size: 1.8rem;
  color: var(--primary-blue);
  margin-bottom: 15px;
}

.service-contact p {
  color: var(--dark-gray);
  margin-bottom: 20px;
}

.cta-button {
  display: inline-block;
  background-color: var(--secondary-orange);
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #e55b17;
}

/* Footer styling similar to Home.vue */
footer {
  background-color: var(--primary-blue);
  color: white;
  padding: 50px 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
}

.footer-column {
  flex: 1;
  min-width: 200px;
}

.footer-column h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: var(--secondary-orange);
}

.footer-column p {
  margin-bottom: 15px;
  line-height: 1.6;
}

.footer-column ul {
  list-style: none;
  flex-direction: column;
}

.footer-column ul li {
  margin-bottom: 10px;
  margin-left: 0;
}

.footer-column ul li a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column ul li a:hover {
  color: var(--secondary-orange);
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: background-color 0.3s;
}

.social-links a:hover {
  background-color: var(--secondary-orange);
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive styles */
@media (max-width: 992px) {
  .main-service-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .mobile-nav-toggle {
    display: block;
  }

  nav {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  nav.active {
    max-height: 300px;
  }

  nav ul {
    flex-direction: column;
    padding: 20px;
  }

  nav ul li {
    margin: 10px 0;
  }

  .service-hero h1 {
    font-size: 2rem;
  }

  .main-service-image {
    height: 300px;
  }
}

@media (max-width: 576px) {
  .main-service-image {
    height: 250px;
  }
}
</style>