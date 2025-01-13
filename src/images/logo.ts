const logo = 'data:image/png;base64,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'

export {logo};