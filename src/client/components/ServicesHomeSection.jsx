import { Link } from 'react-router-dom';
import serviceData from '../data/serviceData';
import Button from './BookButton';

// Component for the home section that displays available services
const ServicesHomeSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-3xl font-bold mb-8 text-center">We Are Specialists In Following Services</h2>
        {/* Grid layout for service items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:p-16">
          {/* Map through serviceData to create service cards */}
          {serviceData.map((service) => (
            <Link 
              to={`/services#${service.path}`} 
              key={service.title} 
              className="bg-white p-6 rounded-lg border-2 border-gray-300"
            >
              {/* Service title */}
              <h3 className="text-2xl font-semibold mb-4 pt-10">{service.title}</h3>
              <div className="flex items-center justify-between">
                {/* 'Book Now' button */}
                <Button styleProp={"text-red-600"} textProp={"Book Now"}/>
                {/* Service icon */}
                <img src={service.iconRed} alt="service icon" className="h-20 w-20" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHomeSection;