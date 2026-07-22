package core

type CatherineShulmansQuotesError struct {
	IsCatherineShulmansQuotesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCatherineShulmansQuotesError(code string, msg string, ctx *Context) *CatherineShulmansQuotesError {
	return &CatherineShulmansQuotesError{
		IsCatherineShulmansQuotesError: true,
		Sdk:              "CatherineShulmansQuotes",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CatherineShulmansQuotesError) Error() string {
	return e.Msg
}
