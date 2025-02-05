"use client"

import { useState, useRef, type FormEvent, useEffect, type React } from "react"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Send, ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { Toast } from "./ui/toast"

interface FormData {
  nombre: string
  apellidos: string
  empresa: string
  email: string
  asunto: string
  mensaje: string
}

interface StatusMessage {
  type: "success" | "error" | "sending" | null
  text: string
}

interface FormStep {
  field: keyof FormData
  label: string
  type: string
  required: boolean
  placeholder?: string
}

const formSteps: FormStep[] = [
  { field: "nombre", label: "Nombre", type: "text", required: true, placeholder: "¿Cómo te llamas?" },
  { field: "apellidos", label: "Apellidos", type: "text", required: false, placeholder: "¿Tus apellidos?" },
  { field: "empresa", label: "Empresa", type: "text", required: false, placeholder: "¿Dónde trabajas?" },
  { field: "email", label: "Email", type: "email", required: true, placeholder: "¿Tu correo electrónico?" },
  { field: "asunto", label: "Asunto", type: "text", required: true, placeholder: "¿Sobre qué quieres hablar?" },
  { field: "mensaje", label: "Mensaje", type: "textarea", required: true, placeholder: "Cuéntame más detalles..." },
]

export function ContactSection() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellidos: "",
    empresa: "",
    email: "",
    asunto: "",
    mensaje: "",
  })
  const [status, setStatus] = useState<StatusMessage>({ type: null, text: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
    } else {
      console.error("EmailJS public key is missing")
    }
  }, [])

  const validateForm = () => {
    const requiredFields = formSteps.filter((step) => step.required)
    for (const field of requiredFields) {
      if (!formData[field.field]) {
        setStatus({
          type: "error",
          text: `El campo ${field.label} es requerido`,
        })
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (currentStep < formSteps.length - 1) {
      const currentField = formSteps[currentStep].field
      if (formSteps[currentStep].required && !formData[currentField]) {
        setStatus({
          type: "error",
          text: "Este campo es requerido",
        })
        return
      }
      setCurrentStep((prev) => prev + 1)
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setStatus({ type: "sending", text: "Enviando mensaje..." })

    try {
      if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS public key is missing")
      }

      // Match the template variables exactly
      const templateParams = {
        name: formData.nombre.trim(),
        surname: formData.apellidos.trim(),
        company: formData.empresa.trim() || "No especificada",
        subject: formData.asunto.trim(),
        message: formData.mensaje.trim(),
        email: formData.email.trim(),
      }

      console.log("Sending email with params:", templateParams)

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )

      setStatus({
        type: "success",
        text: "¡Mensaje enviado con éxito!",
      })
      setShowToast(true)

      // Reset form
      if (formRef.current) {
        formRef.current.reset()
      }
      setFormData({
        nombre: "",
        apellidos: "",
        empresa: "",
        email: "",
        asunto: "",
        mensaje: "",
      })
      setCurrentStep(0)

      // Delay hiding the form to show the success state
      setTimeout(() => {
        setShowForm(false)
      }, 1500)
    } catch (error) {
      console.error("Error:", error)
      setStatus({
        type: "error",
        text: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setStatus({ type: null, text: "" })
      }, 5000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && formSteps[currentStep].type !== "textarea") {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  const currentField = formSteps[currentStep]

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative">
                  ¿Tienes algo en mente?
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground"
              >
                Me encantaría escuchar tus ideas y proyectos
              </motion.p>

              <motion.button
                onClick={() => setShowForm(true)}
                className="group relative px-8 py-4 overflow-hidden rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <span className="relative flex items-center gap-2 text-lg font-medium text-primary">
                  Empecemos a crear
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg ring-1 ring-border/50"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Progress bar */}
                <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Step counter */}
                <div className="text-sm font-medium text-muted-foreground">
                  Paso {currentStep + 1} de {formSteps.length}
                </div>

                {/* Form fields */}
                <div className="min-h-[200px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full space-y-4"
                    >
                      <div className="space-y-2">
                        <motion.label
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="block text-2xl font-medium bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                        >
                          {currentField.label}
                          {currentField.required && <span className="text-destructive ml-1">*</span>}
                        </motion.label>
                        {currentField.type === "textarea" ? (
                          <motion.textarea
                            rows={4}
                            name={currentField.field}
                            value={formData[currentField.field]}
                            onChange={(e) => setFormData({ ...formData, [currentField.field]: e.target.value })}
                            placeholder={currentField.placeholder}
                            required={currentField.required}
                            className="w-full px-4 py-3 text-lg rounded-xl bg-muted border-2 border-muted hover:border-primary/50 focus:border-primary placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                          />
                        ) : (
                          <motion.input
                            type={currentField.type}
                            name={currentField.field}
                            value={formData[currentField.field]}
                            onChange={(e) => setFormData({ ...formData, [currentField.field]: e.target.value })}
                            onKeyPress={handleKeyPress}
                            placeholder={currentField.placeholder}
                            required={currentField.required}
                            className="w-full px-4 py-3 text-lg rounded-xl bg-muted border-2 border-muted hover:border-primary/50 focus:border-primary placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                          />
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center gap-4 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => (currentStep === 0 ? setShowForm(false) : setCurrentStep((prev) => prev - 1))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    {currentStep === 0 ? "Volver" : "Anterior"}
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden group flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <span className="relative">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : currentStep === formSteps.length - 1 ? (
                        <>
                          Enviar
                          <Send className="w-4 h-4 inline-block ml-2 transition-transform group-hover:translate-x-0.5" />
                        </>
                      ) : (
                        <>
                          Siguiente
                          <ArrowRight className="w-4 h-4 inline-block ml-2 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>

                {/* Status Message */}
                <AnimatePresence>
                  {status.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`text-center p-4 text-sm rounded-xl backdrop-blur-sm ${
                        status.type === "success"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-500/30"
                          : status.type === "error"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/30"
                            : "bg-secondary/10 text-secondary ring-1 ring-secondary/30"
                      }`}
                    >
                      {status.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Toast Notification */}
      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        message="¡Mensaje enviado correctamente! Gracias por contactar conmigo."
      />
    </div>
  )
}

