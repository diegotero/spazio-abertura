import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram,
  User,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sendEmail } from '../lib/email';

const LOCATION = { lat: -31.298460, lng: -64.171692 };

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="transition-transform duration-200 group-hover:scale-110">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        setStatus({
          type: 'success',
          message: '¡Mensaje enviado! Te contactaremos pronto.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Hubo un error al enviar el mensaje. Por favor, intentá nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">¡Contactanos!</h2>
          <p className="text-xl text-gray-600">
            Estamos listos para ayudarte con tu proyecto. Completá el formulario y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
            <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Tu nombre"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="tu@email.com"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Tu teléfono"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de proyecto
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="Contanos sobre tu proyecto..."
                />
              </div>

              {/* Status message */}
              {status.type && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{status.message}</p>
                </div>
              )}

              {/* Submit button - pushed to bottom */}
              <div className="mt-auto pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-900 transform hover:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8 h-full flex flex-col">
            {/* Tarjeta de información */}
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Dirección</h4>
                  <p className="text-gray-600">Ruta 9 norte Km 716 ½, Juárez Celman, Córdoba</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Teléfono</h4>
                  <a 
                    href="tel:+5493516224280"
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    (+54) 9 351 622 4280
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a 
                    href="mailto:spazio.aberturas@gmail.com"
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    spazio.aberturas@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Horario de atención</h4>
                  <p className="text-gray-600">Lunes a Viernes de 8 a 17 hs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Instagram</h4>
                  <a 
                    href="https://www.instagram.com/spazio.aberturas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    @spazio.aberturas
                  </a>
                </div>
              </div>
            </div>

            {/* Tarjeta de WhatsApp */}
            <a
              href="https://wa.me/5493516224280"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#075E54] text-white p-6 rounded-2xl hover:scale-[0.98] transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <WhatsAppIcon />
                <h3 className="text-xl font-bold">Contactanos por WhatsApp</h3>
              </div>
              <p className="text-white/90 mb-6">
                Respondemos consultas de Lunes a Viernes de 8 a 17 hs.
              </p>
              <div className="flex items-center gap-2 text-lg font-medium">
                <span>Enviar mensaje</span>
                <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div id="donde-estamos" className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-6">
            Encontranos en Ruta 9 norte Km 716 ½, Juárez Celman
          </h3>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${LOCATION.lat},${LOCATION.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors duration-200"
            >
              <MapPin size={20} />
              Ver en Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200"
            >
              <MapPin size={20} />
              Cómo llegar
            </a>
          </div>
          
          <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.0307372807584!2d${LOCATION.lng}!3d${LOCATION.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDE3JzU0LjUiUyA2NMKwMTAnMTguMSJX!5e0!3m2!1ses!2sar!4v1624451234567!5m2!1ses!2sar`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Spazio Aberturas"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
