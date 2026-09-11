"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RatingStampInput } from "@/components/rating-stamp-input"

export function ReviewForm({ sellerName }: { sellerName: string }) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div
        className="flex items-start gap-4 border-2 border-accent p-5 mix-blend-multiply"
        style={{ filter: "url(#ink-roughen)" }}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent">
          <Check className="size-4" />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="font-serif text-base font-semibold text-accent">Avis publié</p>
          <p className="text-sm text-foreground/80">
            Merci d&apos;avoir donné votre avis sur {sellerName}. Il apparaîtra désormais sur son profil.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        if (rating === 0) return
        setSubmitted(true)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Votre note</FieldLabel>
          <RatingStampInput value={rating} onChange={setRating} />
        </Field>
        <Field>
          <FieldLabel htmlFor="reviewer-name">Votre nom</FieldLabel>
          <Input
            id="reviewer-name"
            placeholder="Ex : Fatou Sarr"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="reviewer-comment">Votre commentaire (facultatif)</FieldLabel>
          <Textarea
            id="reviewer-comment"
            placeholder="Décrivez votre expérience d'achat ou de vente…"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
          />
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={rating === 0 || name.trim().length === 0} className="self-start">
        Publier mon avis
      </Button>
    </form>
  )
}
