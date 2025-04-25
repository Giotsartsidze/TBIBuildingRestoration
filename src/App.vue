<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img src="../public/images/logo.png" alt="TBI Building Restoration Logo">
        </div>
        <button class="mobile-nav-toggle" @click="toggleMobileNav">
          <i :class="['fas', mobileNavActive ? 'fa-times' : 'fa-bars']"></i>
        </button>
        <nav :class="{ active: mobileNavActive }">
          <ul>
            <li v-for="item in navItems" :key="item.href">
              <a :href="item.href" :class="{ active: activeSection === item.id }" @click.prevent="scrollToSection(item.href)">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero" id="home">
    <div class="video-background">
      <video autoplay loop muted playsinline>
        <source src="/avto.mp4" type="video/mp4">
      </video>
      <div class="overlay"></div>
    </div>
    <div class="container">
      <div class="hero-content">
        <h1>YOUR BUILDING'S BEST SHIELD</h1>
        <p>Expert waterproofing and restoration solutions for commercial and industrial properties since 2019.</p>
        <a href="#contact" class="cta-button" @click.prevent="scrollToSection('#contact')">Get a Free Quote</a>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="about" id="about">
    <div class="container">
      <div class="section-title">
        <h2>ABOUT OUR COMPANY</h2>
        <p>Learn more about our commitment to quality and reliability</p>
      </div>
      <div class="about-content">
        <div class="about-text">
          <h3>Your trusted waterproofing partner since 2019</h3>
          <p>Since 2019, TBI Building Restoration Inc. has been helping industrial and commercial clients protect their properties with expert waterproofing and restoration services. We take pride in delivering high-quality solutions with reliability and precision.</p>
          <p>Specializing in hot rubber waterproofing, traffic topping membranes, concrete finishing, and patio stone work, we deliver durable results with professional care. Our team is dedicated to ensuring your building is protected with the highest standards of craftsmanship.</p>
          <p>With over 100+ happy clients, our goal is to continue providing exceptional waterproofing solutions that stand the test of time.</p>
        </div>
        <div class="about-image">
          <img src="/images/service2/service1.jpg" alt="TBI Building Restoration Team at Work">
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section with Modal functionality -->
  <section class="services" id="services">
    <div class="container">
      <div class="section-title">
        <h2>OUR SERVICES</h2>
        <p>Comprehensive waterproofing and restoration solutions</p>
      </div>
      <div class="services-grid">
        <div class="service-card" v-for="(service, index) in services" :key="index">
          <div class="service-image">
            <img :src="service.image" :alt="service.title">
          </div>
          <div class="service-content">
            <h3>{{ service.title }}</h3>
            <p>{{ truncateText(service.description, 15) }}</p>
            <a href="#" class="read-more" @click.prevent="openServiceModal(index)">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Service Modal Popup -->
  <div class="modal-overlay" v-if="showServiceModal" @click.self="closeServiceModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ selectedService.title }}</h2>
        <button class="close-modal" @click="closeServiceModal">&times;</button>
      </div>
      <div class="modal-content">
        <div class="modal-description">
          <p>{{ selectedService.fullDescription || selectedService.description }}</p>
        </div>

        <div class="modal-gallery">
          <div class="gallery-nav">
            <button @click="prevGalleryImage" class="gallery-btn"><i class="fas fa-chevron-left"></i></button>
            <span>{{ currentGalleryIndex + 1 }} / {{ selectedService.gallery ? selectedService.gallery.length : 0 }}</span>
            <button @click="nextGalleryImage" class="gallery-btn"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="gallery-image-container">
            <img v-if="selectedService.gallery && selectedService.gallery.length > 0"
                 :src="selectedService.gallery[currentGalleryIndex]"
                 :alt="`${selectedService.title} - Image ${currentGalleryIndex + 1}`"
                 class="gallery-image">
          </div>
          <div class="gallery-thumbnails">
            <div
                v-for="(image, index) in selectedService.gallery"
                :key="index"
                class="gallery-thumbnail"
                :class="{ active: currentGalleryIndex === index }"
                @click="currentGalleryIndex = index">
              <img :src="image" :alt="`Thumbnail ${index + 1}`">
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cta-button" @click="scrollToSection('#contact'); closeServiceModal();">Request a Quote</button>
      </div>
    </div>
  </div>


  <!-- Testimonials Section -->
  <section class="testimonials">
    <div class="container">
      <div class="section-title">
        <h2>CLIENT TESTIMONIALS</h2>
        <p>What our satisfied clients have to say</p>
      </div>
      <div class="testimonials-slider" @mouseenter="pauseTestimonialSlider" @mouseleave="resumeTestimonialSlider">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-slide" :class="{ active: currentTestimonialSlide === index }">
          <div class="testimonial-content">
            <p>{{ testimonial.content }}</p>
          </div>
          <div class="testimonial-author">
            <h4>{{ testimonial.name }}</h4>
            <p>{{ testimonial.position }}</p>
          </div>
        </div>

        <div class="slider-controls">
          <button @click="prevTestimonialSlide"><i class="fas fa-chevron-left"></i></button>
          <button @click="nextTestimonialSlide"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact" id="contact">
    <div class="container">
      <div class="section-title">
        <h2>WORK WITH US</h2>
        <p>Get in touch for a free consultation and quote</p>
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-detail" v-for="(contact, index) in contactDetails" :key="index">
            <div class="contact-icon">
              <i :class="contact.icon"></i>
            </div>
            <div class="contact-text">
              <h4>{{ contact.title }}</h4>
              <p v-for="(line, i) in contact.lines" :key="i">{{ line }}</p>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <div class="form-group" v-for="(field, index) in formFields" :key="index">
              <label :for="field.id">{{ field.label }}</label>
              <input v-if="field.type !== 'textarea'" :type="field.type" :id="field.id" :name="field.name" v-model="formData[field.name]" :required="field.required">
              <textarea v-else :id="field.id" :name="field.name" v-model="formData[field.name]" :required="field.required"></textarea>
            </div>

            <button type="submit" class="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-column">
          <h3>About TBI</h3>
          <p>TBI Building Restoration Inc. provides expert waterproofing and restoration services for commercial and industrial properties. We take pride in quality workmanship, great customer service, and competitive prices.</p>
          <div class="social-links">
            <a href="#" v-for="(social, index) in socialLinks" :key="index"><i :class="social.icon"></i></a>
          </div>
        </div>

        <div class="footer-column">
          <h3>Our Services</h3>
          <ul>
            <li v-for="(service, index) in services" :key="index">
              <a @click.prevent="openServiceModal(index)" href="#">{{ service.title }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.href" @click.prevent="scrollToSection(item.href)">{{ item.text }}</a>
            </li>
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
        <p>&copy; {{ currentYear }} TBI Building Restoration Inc. All Rights Reserved.</p>
      </div>
    </div>
  </footer>

  <!-- Scroll to top button -->
  <button class="scroll-top-btn" :class="{ visible: showScrollTop }" @click="scrollToTop">
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script>
export default {
  data() {
    return {
      mobileNavActive: false,
      activeSection: 'home',
      currentTestimonialSlide: 0,
      testimonialSlideInterval: null,
      showScrollTop: true,
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      currentYear: new Date().getFullYear(),

      // Navigation items
      navItems: [
        { href: "#home", text: "Home", id: "home" },
        { href: "#about", text: "About", id: "about" },
        { href: "#services", text: "Services", id: "services" },
        { href: "#contact", text: "Contact", id: "contact" }
      ],
      showServiceModal: false,
      selectedServiceIndex: 0,
      selectedService: {},
      currentGalleryIndex: 0,

      // Services data
      services: [
        {
          title: "HOT-APPLIED WATERPROOFING",
          description: "Hot rubberized asphalt waterproofing is a durable, seamless solution used to protect buildings from water infiltration. It creates a strong, flexible barrier that withstands extreme temperatures and movement. We specialize in applying this system with precision and care, ensuring long-lasting protection and top-tier performance on every project.",
          image: './images/service1/service.jpg',
          gallery: [
            './images/service1/service1.jpg',
            './images/service1/service2.jpg',
            './images/service1/service3.jpg',
            './images/service1/service4.jpg',
            './images/service1/service5.jpg',
            './images/service1/service6.jpg'
          ]
        },
        {
          title: "VEHICULAR TRAFFIC COATINGS",
          description: "Vehicular traffic coatings are high-performance systems engineered to protect parking structures, ramps, and driveable surfaces from vehicle wear, water intrusion, and chemical exposure. These coatings enhance safety, reduce long-term maintenance costs, and extend the lifespan of the concrete. Our team delivers expertly installed, durable solutions that meet the demands of high-traffic commercial environments and exceed industry standards.",
          image: './images/service2/service1.jpg',
          gallery: [
            './images/service2/service1.jpg',
            './images/service2/service2.jpg',
            './images/service2/service3.jpg',
            './images/service2/service4.jpg',
            './images/service2/service5.jpg'
          ]
        },
        {
          title: "PEDESTRIAN TRAFFIC COATINGS",
          description: "We offer high-performance pedestrian traffic coatings designed to protect and enhance surfaces like balconies, mechanical rooms, and other high-traffic areas. Our durable, slip-resistant systems provide long-lasting protection against wear, weather, and moisture. Ideal for both new construction and renovation projects, these coatings ensure safety and extend the life of your investment.",
          image: './images/service3/service1.jpg',
          gallery: [
            './images/service3/service1.jpg',
            './images/service3/service2.jpg',
            './images/service3/service3.jpg',
            './images/service3/service4.jpg',
            './images/service3/service5.jpg',
            './images/service3/service6.jpg'
          ]
        },
        {
          title: "PATIO SLABS INSTALLATION",
          description: "We specialize in professional patio slabs installation for rooftops and terraces, combining functionality with aesthetic appeal. Our systems are designed for durability, proper drainage, and long-term performance in outdoor environments. Whether for a modern rooftop patio or a classic terrace, we deliver precision installation tailored to your design vision.",
          image: './images/service4/service1.jpg',
          gallery: [
            './images/service4/service1.jpg',
            './images/service4/service2.jpg',
            './images/service4/service3.jpg',
            './images/service4/service4.jpg'
          ]
        },
        {
          title: "CONCRETE RESTORATION",
          description: "Our concrete restoration and finishing services revive and protect aging or damaged surfaces, restoring structural integrity and visual appeal. From crack repairs to smooth, decorative finishes, we tailor each project to meet your functional and aesthetic needs. Ideal for both commercial and residential applications, our solutions are built to last.",
          image: './images/service5/service1.jpg',
          gallery: [
            './images/service5/service1.jpg',
            './images/service5/service2.jpg',
            './images/service5/service3.jpg',
            './images/service5/service4.jpg',
          ]
        },
      ],

      // Testimonials data
      testimonials: [
        {
          content: "TBI Building Restoration provided exceptional service for our commercial property. Their hot rubber waterproofing solution has completely eliminated our leak issues, and their professionalism throughout the project was outstanding.",
          name: "John Smith",
          position: "Property Manager, ABC Commercial Building"
        },
        {
          content: "We hired TBI for our parking garage restoration project and couldn't be happier with the results. Their traffic topping system has held up remarkably well under heavy use, and their team was efficient and courteous throughout.",
          name: "Sarah Johnson",
          position: "Facilities Director, XYZ Corporate Center"
        },
        {
          content: "After struggling with basement water issues for years, TBI's membrane waterproofing solution has finally solved our problem. Their team was knowledgeable, thorough, and delivered exactly as promised. Highly recommended!",
          name: "Michael Brown",
          position: "Owner, Riverside Industrial Complex"
        }
      ],

      // Contact details
      contactDetails: [
        {
          icon: "fas fa-map-marker-alt",
          title: "Our Location",
          lines: ["Canyon Ave, Toronto, ON M3H4Y2"]
        },
        {
          icon: "fas fa-phone",
          title: "Call Us",
          lines: ["647-997-5112", "416-871-4194"]
        },
        {
          icon: "fas fa-envelope",
          title: "Email Us",
          lines: ["tbibuildingrestoration@gmail.com"]
        },
        {
          icon: "fas fa-clock",
          title: "Business Hours",
          lines: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM"]
        }
      ],

      // Form fields
      formFields: [
        { id: "name", name: "name", label: "Your Name", type: "text", required: true },
        { id: "email", name: "email", label: "Your Email", type: "email", required: true },
        { id: "phone", name: "phone", label: "Your Phone", type: "tel", required: false },
        { id: "message", name: "message", label: "Your Message", type: "textarea", required: true }
      ],

      // Social links
      socialLinks: [
        { icon: "fab fa-facebook-f" },
        { icon: "fab fa-twitter" },
        { icon: "fab fa-linkedin-in" },
        { icon: "fab fa-instagram" }
      ],

      // Contact info for footer
      contactInfo: [
        { icon: "fas fa-phone", text: "647-997-5112" },
        { icon: "fas fa-phone", text: "416-871-4194" },
        { icon: "fas fa-envelope", text: "tbibuildingrestoration@gmail.com" },
        { icon: "fas fa-map-marker-alt", text: "Canyon Ave, Toronto, ON M3H4Y2" }
      ]
    };
  },

  mounted() {
    // Start the sliders
    this.startTestimonialSlider();

    // Add scroll event listener for scroll to top button
    window.addEventListener('scroll', this.handleScroll);

    // Initial check for scroll position
    this.handleScroll();
    // Add event listener for ESC key to close modal
    window.addEventListener('keydown', this.handleKeyDown);

  },

  beforeUnmount() {
    // Clear intervals when component is destroyed
    this.clearTestimonialInterval();

    // Remove scroll event listener
    window.removeEventListener('scroll', this.handleScroll);
    // Remove ESC key event listener
    window.removeEventListener('keydown', this.handleKeyDown);
  },

  methods: {
    truncateText(text, wordCount) {
      const words = text.split(' ');
      if (words.length > wordCount) {
        return words.slice(0, wordCount).join(' ') + '...';
      }
      return text;
    },
    // Mobile navigation toggle
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive;
    },

    // Smooth scrolling to sections
    scrollToSection(href) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });

        this.activeSection = targetId;

        // Close mobile nav if open
        if (this.mobileNavActive) {
          this.mobileNavActive = false;
        }
      }
    },

    // Testimonials slider functions
    startTestimonialSlider() {
      this.testimonialSlideInterval = setInterval(() => {
        this.nextTestimonialSlide();
      }, 6000);
    },

    clearTestimonialInterval() {
      if (this.testimonialSlideInterval) {
        clearInterval(this.testimonialSlideInterval);
      }
    },

    pauseTestimonialSlider() {
      this.clearTestimonialInterval();
    },

    resumeTestimonialSlider() {
      this.startTestimonialSlider();
    },

    nextTestimonialSlide() {
      this.currentTestimonialSlide = (this.currentTestimonialSlide + 1) % this.testimonials.length;
    },

    prevTestimonialSlide() {
      this.currentTestimonialSlide = (this.currentTestimonialSlide - 1 + this.testimonials.length) % this.testimonials.length;
    },

    // Handle scroll events
    handleScroll() {
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });

      if (currentSection) {
        this.activeSection = currentSection;
      }

      // Show/hide scroll to top button
      this.showScrollTop = window.scrollY > 300;
    },

    // Scroll to top
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    // New modal-related methods
    openServiceModal(index) {
      this.selectedServiceIndex = index;
      this.selectedService = this.services[index];
      this.currentGalleryIndex = 0;
      this.showServiceModal = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling of background
    },

    closeServiceModal() {
      this.showServiceModal = false;
      document.body.style.overflow = ''; // Re-enable scrolling
    },

    nextGalleryImage() {
      if (this.selectedService.gallery && this.selectedService.gallery.length > 0) {
        this.currentGalleryIndex = (this.currentGalleryIndex + 1) % this.selectedService.gallery.length;
      }
    },

    prevGalleryImage() {
      if (this.selectedService.gallery && this.selectedService.gallery.length > 0) {
        this.currentGalleryIndex = (this.currentGalleryIndex - 1 + this.selectedService.gallery.length) % this.selectedService.gallery.length;
      }
    },

    handleKeyDown(e) {
      if (e.key === 'Escape' && this.showServiceModal) {
        this.closeServiceModal();
      } else if (e.key === 'ArrowRight' && this.showServiceModal) {
        this.nextGalleryImage();
      } else if (e.key === 'ArrowLeft' && this.showServiceModal) {
        this.prevGalleryImage();
      }
    },

    // Form submission
    submitForm() {
      // Here you would typically send the form data to your server
      console.log('Form submitted:', this.formData);

      // Display success message
      alert('Thank you for your message! We will get back to you soon.');

      // Reset form
      this.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Header Styles */
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

ul {
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

nav ul li a.active {
  color: var(--secondary-orange);
  font-weight: bold;
}

.mobile-nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-blue);
}

/* Hero Section */
.hero {
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--white);
  margin-top: 100px;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-background .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: var(--light-gray);
}

.cta-button {
  display: inline-block;
  background-color: var(--secondary-orange);
  color: var(--white);
  padding: 12px 25px;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #e55b17;
}

/* About Section */
.about {
  padding: 80px 0;
  background-color: var(--white);
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  color: var(--primary-blue);
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.section-title p {
  color: var(--dark-gray);
  font-size: 1.1rem;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.about-text {
  flex: 1;
}

.about-text h3 {
  color: var(--primary-blue);
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.about-text p {
  color: var(--dark-gray);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Services Section */
.services {
  padding: 80px 0;
  background-color: var(--light-gray);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.service-card {
  background-color: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-10px);
}

.service-image {
  height: 200px;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover
;
}

.service-content {
  padding: 20px;
}

.service-content h3 {
  color: var(--primary-blue);
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.service-content p {
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: var(--secondary-orange);
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: color 0.3s;
}

.read-more:hover {
  color: #e55b17;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}

.modal-container {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}

.modal-header h2 {
  color: var(--primary-blue);
  margin: 0;
}

.close-modal {
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;
}

.close-modal:hover {
  color: var(--secondary-orange);
}

.modal-content {
  padding: 20px;
  flex-grow: 1;
}

.modal-description {
  margin-bottom: 30px;
}

.modal-description p {
  color: var(--dark-gray);
  line-height: 1.6;
  font-size: 1rem;
}

.modal-gallery {
  display: flex;
  flex-direction: column;
}

.gallery-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.gallery-btn {
  background-color: var(--primary-blue);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.gallery-btn:hover {
  background-color: var(--secondary-orange);
}

.gallery-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.gallery-thumbnail {
  width: 80px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.gallery-thumbnail.active {
  opacity: 1;
  box-shadow: 0 0 0 2px var(--secondary-orange);
}

.gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

/* Responsive modal styles */
@media (max-width: 768px) {
  .gallery-image-container {
    height: 250px;
  }

  .gallery-thumbnail {
    width: 60px;
    height: 45px;
  }
}

/* Projects Section */
.projects {
  padding: 80px 0;
  background-color: var(--white);
}

.projects-slider {
  margin-top: 50px;
  position: relative;
}

.project-slide {
  display: none;
}

.project-slide.active {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-image {
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info {
  text-align: center;
  max-width: 600px;
}

.project-info h3 {
  color: var(--primary-blue);
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.project-info p {
  color: var(--dark-gray);
  font-size: 1rem;
  line-height: 1.6;
}

.slider-controls {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.slider-controls button {
  background-color: var(--primary-blue);
  color: var(--white);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slider-controls button:hover {
  background-color: var(--secondary-orange);
}

/* Testimonials Section */
.testimonials {
  padding: 80px 0;
  background-color: var(--light-gray);
}

.testimonials-slider {
  margin-top: 50px;
  position: relative;
}

.testimonial-slide {
  display: none;
}

.testimonial-slide.active {
  display: block;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-content {
  background-color: var(--white);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 30px;
}

.testimonial-content::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 20px 20px 0;
  border-style: solid;
  border-color: var(--white) transparent transparent;
}

.testimonial-content p {
  color: var(--dark-gray);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 0;
  font-style: italic;
}

.testimonial-author {
  margin-top: 30px;
}

.testimonial-author h4 {
  color: var(--primary-blue);
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.testimonial-author p {
  color: var(--dark-gray);
  font-size: 0.9rem;
}

/* Contact Section */
.contact {
  padding: 80px 0;
  background-color: var(--white);
}

.contact-content {
  display: flex;
  gap: 50px;
  margin-top: 50px;
}

.contact-info {
  flex: 1;
}

.contact-detail {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background-color: var(--primary-blue);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.contact-text h4 {
  color: var(--primary-blue);
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.contact-text p {
  color: var(--dark-gray);
  font-size: 1rem;
  line-height: 1.6;
}

.contact-form {
  flex: 1;
  background-color: var(--light-gray);
  padding: 30px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: var(--primary-blue);
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-button {
  background-color: var(--secondary-orange);
  color: var(--white);
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e55b17;
}

/* Footer */
footer {
  background-color: var(--primary-blue);
  color: var(--white);
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
  display: flex;
  flex-direction: column;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: var(--white);
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
  color: var(--white);
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

/* Responsive Styles */
@media (max-width: 992px) {
  .about-content,
  .contact-content {
    flex-direction: column;
  }

  .about-image {
    margin-top: 30px;
  }
}

@media (max-width: 768px) {
  .header-content {
    position: relative;
  }

  .mobile-nav-toggle {
    display: block;
  }

  nav {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--white);
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

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .section-title h2 {
    font-size: 2rem;
  }
}
/* Scroll to top button styling */
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--secondary-orange);
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.scroll-top-btn.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  background-color: var(--dark-gray);
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

.scroll-top-btn i {
  font-size: 20px;
}

/* Add a pulsing animation for additional visibility */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(242, 101, 34, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(242, 101, 34, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(242, 101, 34, 0);
  }
}

.scroll-top-btn.visible {
  animation: pulse 2s infinite;
}

/* Make the button smaller on mobile devices */
@media (max-width: 768px) {
  .scroll-top-btn {
    display: none;
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }

  .scroll-top-btn i {
    font-size: 16px;
  }
}
</style>
