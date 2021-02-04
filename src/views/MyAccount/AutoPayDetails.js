import React from 'react';
import { FullAutoPayWrap, AutoPayContainer, FooterBtnContainer } from './style';
import { Divider, Button, Icon, Input, Popup, Table } from 'semantic-ui-react';
import { Hidden } from "@material-ui/core";
import cc_tooltip_one from '../../img/cc_tooltip_one.png';
import cc_tooltip_two from '../../img/cc_tooltip_two.png';

export const AutoPayDetails = props => {

  const { setAutopaySelected } = props;

  return (
    <FullAutoPayWrap>

      <section className="autoPayContainer">
        <AutoPayContainer>
          <Hidden mdUp>
            <section className="autoPayHeader">
              <div>Bill Pay</div>
              <div>As a security measure please confirm CVV to complete your payment.</div>
            </section>
            <Divider />
          </Hidden>

          <section>
            <div className="paymentMethodTop">
              <div className="paymentMethodTitle">Payment Method</div>
              <Button icon labelPosition='left' size='mini'>
                <Icon name='add' />
                Add New Card
              </Button>
            </div>

            <Hidden smDown>
              <Divider />
            </Hidden>

            <div className="paymentMethodBottom">
              <article className="paymentMethodCardInfo">
                <div className="paymentMethodIconWrap">
                  <Hidden smDown>
                    <Icon size="huge" name='cc visa' />
                  </Hidden>
                  <Hidden mdUp>
                    <Icon size="large" name='cc visa' />
                  </Hidden>
                </div>
                <div className="paymentMethodCc">
                  Visa (1234)
                  <Hidden smDown>
                    <div>3275 SW Street Dr, Miami, FL 25250</div>
                    <Button size="small" compact>
                      Update Card
                    </Button>
                  </Hidden>
                </div>
              </article>

              <article className="paymentMethodVerify">
                <div>
                  Confirm CVV
                  <Popup
                    basic
                    flowing
                    hoverable
                    trigger={
                      <Icon
                        style={{ margin: '0 7px', fontSize: 15, height: '100%' }}
                        name="question circle outline"
                      />
                    }
                  >
                    <section
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                      }}
                    >
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize: 10,
                          justifyContent: 'center',
                          padding: 4
                        }}
                      > 
                        3 digit strength code
                        <img src={cc_tooltip_two} alt="cvc" />
                      </div>
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize: 10,
                          justifyContent: 'center',
                          padding: 4
                        }}
                      > 
                        4 digit strength code
                        <img src={cc_tooltip_one} alt="cvc" />
                      </div>
                    </section>
                  </Popup>
                </div>

                <Input size='mini' placeholder='000' type='number' />
              </article>
            </div>
          </section>

          <Divider />

          <Hidden mdUp>
            <section>
              <div>Unit Balance</div>
              <div className="balanceDetails">
                <article className="balanceLocation">
                  <div>Belleville - #1024</div>
                  <div>07/20/20</div>
                </article>
                <article>
                  <div className="balanceAutoPay">Auto-Pay</div>
                  <div className="balanceAutoPayAmount">$11.00</div>
                </article>
              </div>
            </section>

            <section className="balance">
              <article className="balanceTax">
                <div>Tax</div>
                <div>$0.88</div>
              </article>
              <article className="balanceTotal">
                <div>Total:</div>
                <div>$11.88</div>
              </article>
            </section>
          </Hidden>
        </AutoPayContainer>

        <Hidden smDown>
          <section className="desktopBalance">
            <div className="sectionTitle">Unit Balance</div>
            <div className="sectionSubTitle">
              Auto-Pay will start <strong>08/01/2020</strong> after you pay this months balance
            </div>

            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Unit</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Pay Period</Table.HeaderCell>
                  <Table.HeaderCell width={8} textAlign='right'>Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>#3450</Table.Cell>
                  <Table.Cell>Hobe Sound II</Table.Cell>
                  <Table.Cell>07/20/2020</Table.Cell>
                  <Table.Cell textAlign='right'>$0.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell textAlign='right'>Tax $0.00</Table.Cell>
                </Table.Row>
                <Table.Row active>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell textAlign='right'><strong>Total: $0.00</strong></Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell colSpan='4'>
                    <Button
                      className='footerSaveBtn'
                      floated='right'
                      size='small'
                    >
                      Set Payment Method
                    </Button>
                    <Button
                      className='footerCancelBtn'
                      floated='right'
                      size='small'
                      onClick={() => setAutopaySelected(false)}
                    >
                        Cancel
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>

          </section>
        </Hidden>
      </section>

      <Hidden smDown>
        <section className="locationDetailsContainer">

          <div className="locationDetailsTop">
            <div className="locationImg"></div>
            <div className="locationDetails">
              <div className="detailLarge">Hobe Sound II</div>
              <div className="detailLarge">Unit# 3450</div>
              <div className="detailSmall">20 Mill Street, Belleville, NJ 07109</div>
              <div className="detailSmall">973-510-2550</div>
            </div>
          </div>

          <Divider />

          <div className="locationDetailsBottom">
            <div></div>
            <div className="locationSize">3' x 3' <span>| Small</span></div>
            <div className="locationCost">$20 <span>/mo</span></div>
          </div>
        </section>
      </Hidden>

      <Hidden mdUp>
        <FooterBtnContainer>
          <Button
            className="footerCancelBtn footerBtn"
            onClick={() => setAutopaySelected(false)}
          >
            Cancel
          </Button>

          <Button
            className="footerSaveBtn footerBtn"
          >
            Save
          </Button>
        </FooterBtnContainer>
      </Hidden>
    </FullAutoPayWrap>
  );
}