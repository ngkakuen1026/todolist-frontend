import React from 'react'
import { useTranslation } from 'react-i18next'

const Help = () => {

  const [t, i18n] = useTranslation("global");  

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{t("help.heading")}</h1>
      </div>
    </>
  )
}

export default Help
