import emailjs from '@emailjs/browser';

// Tipos para los datos del formulario
export interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

// Tipos para la respuesta del email
export interface EmailResponse {
  success: boolean;
  error?: string;
}

// Configuración de EmailJS
const EMAIL_CONFIG = {
  serviceId: 'service_ynzexjr',
  templateId: 'template_wilc3gj',
  publicKey: 'zvZ5ZyKynxofam1_4',
} as const;

/**
 * Envía un email usando EmailJS
 * @param data Datos del formulario
 * @returns Objeto con el resultado del envío
 */
export async function sendEmail(data: EmailFormData): Promise<EmailResponse> {
  try {
    // Inicializar EmailJS con la clave pública
    emailjs.init({
      publicKey: EMAIL_CONFIG.publicKey,
      limitRate: {
        // Límites de tasa para prevenir spam
        throttle: 3000, // 3 segundos entre emails
      },
    });

    // Preparar los datos para la plantilla
    const templateParams = {
      to_name: 'Spazio Aberturas',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      project_type: data.projectType || 'No especificado',
      message: data.message,
    };

    // Enviar el email
    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    // Verificar el resultado
    if (result.status === 200) {
      return { success: true };
    } else {
      throw new Error('Error al enviar el email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al enviar el email'
    };
  }
}
